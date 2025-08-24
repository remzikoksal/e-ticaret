import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const BASE = "/api/products";

const BestSellers = () => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
      
        const idxRes = await fetch(`${BASE}/index.json`);
        if (!idxRes.ok) throw new Error(`index.json HTTP ${idxRes.status}`);
        const idx = await idxRes.json();
        const bestIds = (idx.products || [])
          .filter((x) => x.bestSeller)
          .map((x) => x.id);

      
        const prods = await Promise.all(
          bestIds.map(async (id) => {
            const res = await fetch(`${BASE}/${id}.json`);
            if (!res.ok) throw new Error(`${id}.json HTTP ${res.status}`);
            return res.json();
          })
        );

        if (alive) setItems(prods);
      } catch (e) {
        console.error("BestSellers load error:", e);
        if (alive) setItems([]);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  
  if (!items) {
    return (
      <section className="px-4 py-10">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">Featured Products</p>
          <h2 className="text-xl font-bold text-gray-800">BESTSELLER PRODUCTS</h2>
          <p className="text-xs text-gray-500 mt-1">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 max-w-[1280px] mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="w-full aspect-[3/4] lg:aspect-[4/5] rounded bg-gray-200 animate-pulse" />
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
      </section>
    );
  }

  return (
    <section className="px-4 py-10">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">Featured Products</p>
        <h2 className="text-xl font-bold text-gray-800">BESTSELLER PRODUCTS</h2>
        <p className="text-xs text-gray-500 mt-1">
          Problems trying to resolve the conflict between
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 max-w-[1280px] mx-auto">
        {items.map((p, index) => {
          const image =
            p?.images?.[0]?.url || p?.images?.[0] || "/placeholder.jpg";
          const title = p?.name || "Product";
          const newPrice = Number(p?.price ?? 0);
          const oldPrice = newPrice ? (newPrice * 1.6) : 0;

          return (
            <ProductCard
              key={p?.id ?? index}
              id={p?.id}
              to={`/product/${p?.id}`}   
              image={image}
              title={title}
              subtitle={"English Department"}
              oldPrice={oldPrice.toFixed(2)}
              newPrice={newPrice.toFixed(2)}
              colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
            />
          );
        })}
      </div>
    </section>
  );
};

export default BestSellers;
