# Graph Report - elisn-lab  (2026-10-09)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 11 nodes · 16 edges · 3 communities (0 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 34,677 input · 41 output

## Graph Freshness
- Built from commit: `ca3c2f36`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- QR Math Operations
- QR Code Generator
- Service Worker Cache

## God Nodes (most connected - your core abstractions)
1. `_this` - 5 edges
2. `qrPolynomial()` - 4 edges
3. `PRECACHE` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (3 total, 3 thin omitted)

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `qrPolynomial()` connect `QR Code Generator` to `QR Math Operations`?**
  _High betweenness centrality (0.228) - this node is a cross-community bridge._
- **Why does `_this` connect `QR Math Operations` to `QR Code Generator`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._