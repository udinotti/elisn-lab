// ELISN 오프라인 도우미 (서비스 워커: 브라우저 뒤에서 도는 작은 프로그램)
// 한 번 열면 페이지·조항 자료·원문을 폰에 저장해, 인터넷이 없어도 검색·원문 보기가 되게 한다.
// 그림은 데이터를 아끼려고 한 번 본 것만 저장한다.
// VERSION·PRECACHE는 사이트만들기.js가 채운다. 자료가 바뀌면 VERSION이 바뀌어 새로 저장하고 옛 것은 지운다.
const VERSION="b1835274ff", IMGVERSION="99d5341df5"; // 그림 버전은 그림이 바뀔 때만 바뀐다 → 자료만 바뀌면 본 그림은 남는다
const CORE="elisn-lab-core-"+VERSION, IMG="elisn-lab-img-"+IMGVERSION, FONT="elisn-lab-font";
const PRECACHE=["./","manifest.webmanifest","data/criteria.json","data/standardization.json","data/fixes.json","data/law.json","data/kinds.json","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png"];

self.addEventListener("install",e=>{
  // cache:"reload" = 브라우저에 남은 옛 파일 말고 서버에서 새로 받기
  e.waitUntil(caches.open(CORE).then(c=>c.addAll(PRECACHE.map(u=>new Request(u,{cache:"reload"})))));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys()
    // 자기 저장본의 옛 판만 지운다 (같은 주소 아래 테스트 사이트 elisn-lab의 저장본은 건드리지 않게, 접두어를 정확히 본다)
    .then(ks=>Promise.all(ks.filter(k=>(k.startsWith("elisn-lab-core-")||k.startsWith("elisn-lab-img-"))&&![CORE,IMG].includes(k)).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
// 페이지에서 "업데이트가 있어요"를 누르면 기다리던 새 버전을 바로 쓴다
self.addEventListener("message",e=>{ if(e.data==="skip") self.skipWaiting(); });

// 저장된 것을 먼저 쓰고, 없으면 인터넷에서 받아 (필요하면) 저장한다
async function fromCache(req,cacheName,store,opts){
  const c=await caches.open(cacheName);
  const hit=await c.match(req,opts);
  if(hit) return hit;
  const res=await fetch(req);
  if(store&&(res.ok||res.type==="opaque")) c.put(req,res.clone());
  return res;
}
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET") return;
  const u=new URL(r.url);
  if(u.origin===location.origin){
    // 페이지 자체: 주소 뒤 검색 조건(?q=…)과 상관없이 저장된 페이지를 연다
    // (첫 화면 주소일 때만. 그림을 "새 탭에서 열기"처럼 다른 주소를 열면 아래로 넘겨 그 파일을 그대로 준다)
    const home=new URL(self.registration.scope).pathname;
    if(r.mode==="navigate"&&(u.pathname===home||u.pathname===home+"index.html")){ e.respondWith(caches.open(CORE).then(c=>c.match("./")).then(m=>m||fetch(r))); return; }
    if(u.pathname.includes("/images/")){ e.respondWith(fromCache(r,IMG,true)); return; }
    e.respondWith(fromCache(r,CORE,false,{ignoreSearch:true}));
    return;
  }
  // 글꼴(구글 글꼴): 한 번 받은 것은 저장해 두고 계속 쓴다
  if(u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com") e.respondWith(fromCache(r,FONT,true));
  // 법령정보센터·노션 같은 다른 사이트는 건드리지 않는다
});
