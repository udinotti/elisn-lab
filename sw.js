// ELISN 오프라인 도우미 (서비스 워커: 브라우저 뒤에서 도는 작은 프로그램)
// 한 번 열면 페이지·조항 자료·원문을 폰에 저장해, 인터넷이 없어도 검색·원문 보기가 되게 한다.
// 그림은 첫 화면을 늦추지 않게, 핵심 자료를 저장한 뒤 페이지가 뒤에서 하나씩 받아 저장한다(이미 받은 그림은 다시 안 받음).
// VERSION·PRECACHE는 사이트만들기.js가 채운다. 자료가 바뀌면 VERSION이 바뀌어 새로 저장하고 옛 것은 지운다.
const VERSION="09e715b5db", IMGVERSION="81f5e0aa72"; // 그림 버전은 그림이 바뀔 때만 바뀐다 → 자료만 바뀌면 본 그림은 남는다
const CORE="elisn-lab-core-"+VERSION, IMG="elisn-lab-img-"+IMGVERSION, FONT="elisn-lab-font";
const PRECACHE=["./","manifest.webmanifest","data/criteria.json","data/standardization.json","data/fixes.json","data/law.json","data/kinds.json","data/fail.json","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png"];
const IMAGES=["images/10.1.2.PNG","images/10.1.3.PNG","images/10.7.5.PNG","images/10.7.5_small.png","images/11.4.4.PNG","images/11.4.5.PNG","images/13.1.3.PNG","images/14.1.2.1.PNG","images/14.1.3.1.PNG","images/15.2.3.3.PNG","images/16.1.5.2.4.PNG","images/16.1.8.3.PNG","images/16.3(1).png","images/16.3.PNG","images/17.2.2.1.PNG","images/17.2.4.6.PNG","images/17.2.5.3.PNG","images/17.2.5.4.PNG","images/17.2.8.1.PNG","images/17.2.9.1.PNG","images/3.1.3(7).PNG","images/3.1.6(5).PNG","images/4.1.1(2).PNG","images/4.1.1(4).PNG","images/4.1.3(8).PNG","images/6.5.2.3.PNG","images/6.5.3.1.PNG","images/6.5.3.2.PNG","images/6.5.6.1.1.PNG","images/6.5.7.1.PNG","images/6.5.7.2.PNG","images/6.5.8.2.PNG","images/7.4.3.PNG","images/7.5.3.4.PNG","images/7.9.1.2.PNG","images/8.2.3.1.PNG","images/8.2.3.2.PNG","images/8.2.3.PNG","images/8.3.2.3.PNG","images/8.7.3.PNG","images/8.7.4.PNG","images/9.11.5.PNG","images/9.7.1.PNG","images/9.7.2.PNG","images/KS13857.png","images/LH_gateway.jpg","images/P.6.5.3.1.PNG","images/P.6.5.4.PNG","images/P.6.5.5.PNG","images/P.6.5.7.2.PNG","images/P.6.5.8.2.PNG","images/P.6.6.4.3.1.PNG","images/P.7.10.PNG","images/P.8.2.PNG","images/P.9.1.PNG","images/P.9.7(2).PNG","images/P.9.7.PNG","images/RBI.png","images/cam.png","images/car.png","images/danger.PNG","images/danger2.PNG","images/danger3.PNG","images/elev/E2009_fig1.png","images/elev/E2009_fig2.png","images/elev/E2009_fig3.png","images/elev/E2013-18_fig1.png","images/elev/E2013-18_fig10.png","images/elev/E2013-18_fig12.png","images/elev/E2013-18_fig13.png","images/elev/E2013-18_fig2.png","images/elev/E2013-18_fig3.png","images/elev/E2013-18_fig5.png","images/elev/E2013-18_fig6.png","images/elev/E2013-18_fig7.png","images/elev/E2013-18_fig8-1.png","images/elev/E2013-18_fig8-2.png","images/elev/E2013-18_fig8-3.png","images/elev/E2013-18_fig9.png","images/elev/E2019_fig14.png","images/pit/pit_escape.png","images/retainer.png","images/kinds/019517e8768e.png","images/kinds/0313486cb821.png","images/kinds/03f1aa8986ad.png","images/kinds/04ea548577bf.png","images/kinds/0a1d5c73552c.png","images/kinds/0a3afe13ad17.png","images/kinds/0b5563ca0da2.png","images/kinds/0ba50fce2f20.png","images/kinds/0da7fd6211a4.png","images/kinds/0f8f9cafc499.png","images/kinds/11be337a7099.png","images/kinds/148ecb2f8eb3.png","images/kinds/190e77a8f5cb.png","images/kinds/19e3d517b6de.png","images/kinds/1c39a775868e.png","images/kinds/1cea3b406a1b.png","images/kinds/1e0750416af8.png","images/kinds/244509cc51b7.png","images/kinds/26f13a2b51b7.png","images/kinds/294db3496ecf.png","images/kinds/2997bd2e8e34.png","images/kinds/2a67f7e11ac8.png","images/kinds/2c20a56b5efe.png","images/kinds/2d543aa80e01.png","images/kinds/312a71463348.png","images/kinds/3260ffcc78f5.png","images/kinds/3ac1d0679e7f.png","images/kinds/3bfb2edbdcc7.png","images/kinds/3c104616a16e.png","images/kinds/3dc5d465878c.png","images/kinds/401026d59ab6.png","images/kinds/41ea9d66a186.png","images/kinds/430fab285750.png","images/kinds/44b4edb21171.png","images/kinds/478fc9afd539.png","images/kinds/48f73956dfcf.png","images/kinds/4b579cd67865.png","images/kinds/4bac6d73089b.png","images/kinds/4c24641e8326.png","images/kinds/529118c737eb.png","images/kinds/530642869ada.png","images/kinds/54bfecf12bce.png","images/kinds/5792c555f018.png","images/kinds/57eae7aeb51a.png","images/kinds/59b03ac3e332.png","images/kinds/59fa0c71e4d3.png","images/kinds/5a17d3456060.png","images/kinds/5a58b2cc73c3.png","images/kinds/5d2c469bb320.png","images/kinds/5d4c4deedb53.png","images/kinds/5f280796e2bb.png","images/kinds/6c0f8c54a7af.png","images/kinds/6c7d4c1f35fe.png","images/kinds/6cb8d9f35e62.png","images/kinds/6e86de19b38f.png","images/kinds/6ed8a2412d01.png","images/kinds/6ee91e9c7e9b.png","images/kinds/703b870aea1d.png","images/kinds/704661905b6e.png","images/kinds/71c89f8b7dc5.png","images/kinds/728a9b90f478.png","images/kinds/75c3764b284d.png","images/kinds/761f8583047d.png","images/kinds/7a6ef5d2a96c.png","images/kinds/81a02c09ec05.png","images/kinds/827df5b47352.png","images/kinds/854b11d12c32.png","images/kinds/87868a66a462.png","images/kinds/884f5a92cdc5.png","images/kinds/8864bb958437.png","images/kinds/88cbb75bcb8f.png","images/kinds/8bbc861f5545.png","images/kinds/8e2f88bf0a34.png","images/kinds/926cafc05d0c.png","images/kinds/934e9b434746.png","images/kinds/94328f58262f.png","images/kinds/95857c9028c4.png","images/kinds/95f5ef107fa9.png","images/kinds/992b2a215e49.png","images/kinds/9df56ed54bd0.png","images/kinds/9e490ae2805f.png","images/kinds/9eef55b34e9c.png","images/kinds/a0a6db5dae63.png","images/kinds/a30e2bd1b376.png","images/kinds/a7b6ba0418f4.png","images/kinds/ab336c8373b8.png","images/kinds/af6c15a8c462.png","images/kinds/b058f0f6fc18.png","images/kinds/b480a767ca21.png","images/kinds/b64dbef54a01.png","images/kinds/b65d2bb63b91.png","images/kinds/b719316a9e89.png","images/kinds/b949b1df9367.png","images/kinds/ba6446367992.png","images/kinds/c5417f5ae52e.png","images/kinds/c92505bea73d.png","images/kinds/c9735a7f1f12.png","images/kinds/ce8a3f95d33e.png","images/kinds/d1ae5221f9aa.png","images/kinds/d241061b5a8a.png","images/kinds/d2659596cce1.png","images/kinds/d3359c136c16.png","images/kinds/d41b3e16c5d0.png","images/kinds/d47b981ca97e.png","images/kinds/dac3f1390dd2.png","images/kinds/daecaefbfae4.png","images/kinds/dce52caf7495.png","images/kinds/dd94baa9e5c0.png","images/kinds/e0ea85d7eb71.png","images/kinds/e290db332b88.png","images/kinds/e358e100270d.png","images/kinds/f083faa2d5b8.png","images/kinds/f5a50ac82c73.png","images/kinds/f6587d2ba427.png","images/kinds/fd93aea303fd.png","images/kinds/fe2179f1e8a7.png"]; // 조항에 붙은 그림 전부(사이트만들기.js가 채움). 핵심 자료 저장이 끝난 뒤 뒤에서 받는다

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
// 페이지가 보내는 말: skip = 기다리던 새 버전 바로 쓰기, images = 아직 없는 그림 목록을 페이지에 알려 줌(페이지가 하나씩 받음)
self.addEventListener("message",e=>{
  if(e.data==="skip") self.skipWaiting();
  else if(e.data==="images") e.waitUntil(caches.open(IMG).then(c=>missingImages(c,IMAGES,self.registration.scope)).then(m=>{ if(e.source&&m.length) e.source.postMessage({images:m}); }));
});
// [그림받기 시작]
// 아직 저장 안 된 그림 주소만 골라 준다(이미 있는 것은 다시 안 받게). 실제 받기는 페이지가 하나씩 요청해 아래 fetch 처리기가 저장한다
// (서비스 워커 혼자 오래 받으면 브라우저가 10초쯤 뒤 끊어 버려서)
async function missingImages(cache,list,base){
  const have=new Set((await cache.keys()).map(r=>new URL(r.url).pathname));
  return list.map(u=>new URL(u,base)).filter(u=>!have.has(u.pathname)).map(u=>u.href);
}
// [그림받기 끝]

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
    e.respondWith(fromCache(r,CORE,u.pathname.endsWith("/data/refs.json"),{ignoreSearch:true})); // refs.json(표·부속서·별표 원문)은 미리 받지 않고, 한 번 열어 본 것만 저장해 둔다
    return;
  }
  // 글꼴(구글 글꼴): 한 번 받은 것은 저장해 두고 계속 쓴다
  if(u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com") e.respondWith(fromCache(r,FONT,true));
  // 법령정보센터·노션 같은 다른 사이트는 건드리지 않는다
});
