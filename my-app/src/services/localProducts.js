const BASE = "/api/products";

let _indexCache = null;        
const _productCache = new Map(); 

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

function normalize(p = {}) {
  const images = Array.isArray(p.images)
    ? p.images.map(it => (typeof it === "string" ? it : it.url))
    : [];
  return { ...p, images };
}

async function loadIndex() {
  if (_indexCache) return _indexCache;
  const data = await fetchJSON(`${BASE}/index.json`);
  _indexCache = Array.isArray(data.products) ? data.products : [];
  return _indexCache;
}

async function loadProduct(id) {
  if (_productCache.has(id)) return _productCache.get(id);
  const raw = await fetchJSON(`${BASE}/${id}.json`);
  const prod = normalize(raw);
  _productCache.set(id, prod);
  return prod;
}


export async function getBestSellers() {
  const idx = await loadIndex();
  const ids = idx.filter(x => x.bestSeller).map(x => x.id);
  const items = await Promise.all(ids.map(loadProduct));
  
  return items.sort((a, b) => a.id - b.id);
}


export async function getShopProducts() {
  const idx = await loadIndex();
  const ids = idx.filter(x => x.visibleInShop).map(x => x.id);
  const items = await Promise.all(ids.map(loadProduct));
  return items.sort((a, b) => a.id - b.id);
}
