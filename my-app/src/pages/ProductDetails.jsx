import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Section1 from "./detail/Section1";
import Section2 from "./detail/Section2";
import Section3 from "./detail/Section3";
import Section4 from "./detail/Section4";

const BASE = "/api/products";

export default function ProductDetail() {
  const { productId } = useParams();
  const history = useHistory();
  const [item, setItem] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  React.useEffect(() => {
    let alive = true;
    setStatus("loading");

    (async () => {
      try {
        const cleanId = String(productId).replace(/\.json$/i, "");
        const res = await fetch(`${BASE}/${cleanId}.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const images = Array.isArray(data.images)
          ? data.images
              .map((it) => (typeof it === "string" ? it : it?.url))
              .filter(Boolean)
          : [];

        if (alive) setItem({ ...data, images });
      } catch (e) {
        console.error("ProductDetail load error:", e);
        if (alive) setItem(null);
      } finally {
        if (alive) setStatus("done");
      }
    })();

    return () => {
      alive = false;
    };
  }, [productId]);

  if (status === "loading") {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16 grid place-items-center">
        <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-[#23A6F0] animate-spin" />
        <span className="sr-only">Loading</span>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-red-600 font-semibold mb-4">
          Ürün bulunamadı veya yüklenemedi.
        </p>
        <button onClick={() => history.goBack()} className="text-[#23A6F0] underline">
          Geri dön
        </button>
      </main>
    );
  }

  return (
    <main>
      <div>
      
      <Section1 product={item} />
      <Section2 product={item} />
      <Section3 product={item} />
      <Section4 product={item} />
      </div>
    </main>
  );
}
