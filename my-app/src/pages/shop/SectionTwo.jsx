// src/pages/shop/SectionTwo.jsx
import { useEffect, useState } from "react";
import { ChevronDown, LayoutGrid, List } from "lucide-react";
import ProductCard from "../../components/ProductCard";

const BASE = "/api/products";

export default function SectionTwo() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let alive = true;

    async function fetchJSON(url) {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
      return res.json();
    }
    async function fetchProductSafe(id) {
      try {
        const p = await fetchJSON(`${BASE}/${id}.json`);
     
        const images = Array.isArray(p.images)
          ? p.images.map((it) => (typeof it === "string" ? it : it.url))
          : [];
        return { ...p, images };
      } catch (e) {
        console.warn("Shop product load failed:", id, e.message);
        return null;
      }
    }

    async function load() {
      try {
        const idx = await fetchJSON(`${BASE}/index.json`);
        const list = Array.isArray(idx.products) ? idx.products : [];
        const ids = list.filter(x => x.visibleInShop).map(x => x.id);

        const results = await Promise.all(ids.map(fetchProductSafe));
        const arr = results.filter(Boolean).sort((a, b) => (a?.id ?? 0) - (b?.id ?? 0));

        if (alive) setItems(arr);
      } catch (e) {
        console.error("Shop load error:", e);
        if (alive) setItems([]);
      }
    }

    load();
    return () => { alive = false; };
  }, []);


  const total = items?.length ?? 0;
  const pageSize = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const sliceStart = (page - 1) * pageSize;
  const sliceEnd = sliceStart + pageSize;
  const mobileProducts = (items || []).slice(sliceStart, sliceEnd);

  const goFirst = () => setPage(1);
  const goNext  = () => setPage((p) => Math.min(p + 1, totalPages));
  const goPrev  = () => setPage((p) => Math.max(p - 1, 1));
  const goTo    = (n) => setPage(n);


  const TopBar = (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      <div className="flex flex-col items-center text-center gap-4 md:flex-row md:items-center md:justify-between md:text-left">
        <p className="text-sm text-gray-600">Showing all {total} results</p>

        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
          <span className="text-sm text-gray-600">Views:</span>
          <div className="flex items-center gap-2">
            <button type="button" className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-50" title="Grid view">
              <LayoutGrid size={16} />
            </button>
            <button type="button" className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-50" title="List view">
              <List size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <button type="button" className="flex items-center justify-between gap-2 border rounded px-3 py-2 text-sm min-w-32" title="Sort by">
            <span>Popularity</span>
            <ChevronDown size={16} />
          </button>
          <button type="button" className="rounded bg-[#23A6F0] text-white text-sm px-4 py-2 hover:opacity-90">
            Filter
          </button>
        </div>
      </div>
    </div>
  );

 
  if (items === null) {
    return (
      <section className="bg-white">
        {TopBar}

   
        <div className="max-w-7xl mx-auto px-4 py-8 md:hidden">
          <div className="grid grid-cols-1 gap-y-12">
            {Array.from({ length: pageSize }).map((_, i) => (
              <div key={`m-skel-${i}`} className="space-y-2">
                <div className="w-full aspect-[3/4] rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-2/3 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-1/2 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/3 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="flex justify-center gap-2">
                  {Array.from({ length: 4 }).map((__, k) => (
                    <span key={k} className="w-3 h-3 rounded-full bg-gray-200 animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

   
        <div className="max-w-7xl mx-auto px-4 py-8 hidden md:block">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`d-skel-${i}`} className="space-y-2">
                <div className="w-full aspect-[4/5] rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-2/3 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-1/2 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/3 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="flex justify-center gap-2">
                  {Array.from({ length: 4 }).map((__, k) => (
                    <span key={k} className="w-3 h-3 rounded-full bg-gray-200 animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      {TopBar}

     
      <div className="max-w-7xl mx-auto px-4 py-8 md:hidden">
        <div className="grid grid-cols-1 gap-y-12">
          {mobileProducts.map((p, idx) => {
            const image = p?.images?.[0] || "/placeholder.jpg";
            const newPrice = Number(p?.price ?? 0);
            const oldPrice = newPrice ? newPrice * 1.6 : 0;

            return (
              <ProductCard
                key={`m-${sliceStart + idx}`}
                to={`/product/${p?.id}`}        
                image={image}
                title={p?.name || "Product"}
                subtitle={"English Department"}
                oldPrice={oldPrice.toFixed(2)}
                newPrice={newPrice.toFixed(2)}
                colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
              />
            );
          })}
        </div>

      
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={goFirst}
            disabled={page === 1}
            className={`h-9 px-3 rounded border text-sm ${page === 1 ? "text-gray-400 border-gray-200" : "hover:bg-gray-50"}`}
          >
            First
          </button>

          <button onClick={goPrev} disabled={page === 1} className="sr-only" aria-label="Previous page" />

          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            const active = n === page;
            return (
              <button
                key={n}
                onClick={() => goTo(n)}
                className={`h-9 w-9 rounded border text-sm ${
                  active ? "bg-[#23A6F0] text-white border-[#23A6F0]" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            );
          })}

          <button onClick={goNext} disabled={page === totalPages} className="sr-only" aria-label="Next page" />

          <button
            onClick={goNext}
            disabled={page === totalPages}
            className={`h-9 px-3 rounded border text-sm ${page === totalPages ? "text-gray-400 border-gray-200" : "hover:bg-gray-50"}`}
          >
            Next
          </button>
        </div>
      </div>

    
      <div className="max-w-7xl mx-auto px-4 py-8 hidden md:block">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-12">
          {items.map((p, idx) => {
            const image = p?.images?.[0] || "/placeholder.jpg";
            const newPrice = Number(p?.price ?? 0);
            const oldPrice = newPrice ? newPrice * 1.6 : 0;

            return (
              <ProductCard
                key={`d-${idx}`}
                to={`/product/${p?.id}`}         
                image={image}
                title={p?.name || "Product"}
                subtitle={"English Department"}
                oldPrice={oldPrice.toFixed(2)}
                newPrice={newPrice.toFixed(2)}
                colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
