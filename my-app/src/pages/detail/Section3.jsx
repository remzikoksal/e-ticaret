import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/thunks/productThunks";



export default function Section3({ product, title = "BESTSELLER PRODUCTS", limit = 8 }) {
  const dispatch = useDispatch();
  const { productList = [], fetchState } = useSelector((s) => s.product || {});
  const [status, setStatus] = React.useState("loading");

  React.useEffect(() => {
    let alive = true;
    (async () => {
      await dispatch(fetchProducts());
      if (alive) setStatus("done");
    })();
    return () => { alive = false; };
  }, [dispatch]);

  const currentId = Number(product?.id);
  const pool = productList.filter((p) => Number(p?.id) !== currentId).slice(0, limit).map((data) => {
    const images = Array.isArray(data.images)
      ? data.images.map((it) => (typeof it === "string" ? it : it?.url)).filter(Boolean)
      : [];
    const image = images[0] || data.image || data.imageUrl || "/placeholder.jpg";

    const priceText = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
      .format(Number(data.price || 0));

    const oldRaw = data.old_price ?? data.price_old ?? null;
    const oldText = oldRaw
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(oldRaw))
      : null;

    const desc = (data.description || "").trim();
    const subtitle = desc.length ? truncate(desc, 60) : " ";

    return {
      id: Number(data.id),
      name: data.name || `Product ${data.id}`,
      subtitle,
      image,
      priceText,
      oldText,
    };
  });

  const Content = () => (
    <>
      <h2 className="text-lg md:text-2xl font-bold  pt-20 pb-5 uppercase text-[#252B42] mb-4">{title}</h2>
      <hr className="border-gray-200 mb-6" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10 gap-6">
        {pool.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="block bg-white rounded border hover:shadow-sm transition">
            <div className="w-full h-[180px] md:h-[200px] lg:h-[220px] overflow-hidden rounded-t">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="font-semibold text-[#252B42]">{p.name}</div>
              <div className="text-sm text-[#737373] mt-1">{p.subtitle}</div>
              <div className="flex items-baseline gap-2 mt-3">
                {p.oldText && <span className="text-sm text-[#BDBDBD] line-through">{p.oldText}</span>}
                <span className="text-sm font-bold text-[#23856D]">{p.priceText}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );

  if (status === "loading" || fetchState === 'FETCHING') {
    return (
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-4">
          <h2 className="text-lg md:text-xl font-bold uppercase text-[#252B42] mb-4">{title}</h2>
          <hr className="border-gray-200 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="bg-white rounded border">
                <div className="h-[180px] md:h-[200px] lg:h-[220px] bg-gray-100 animate-pulse rounded-t" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 md:px-4">
        <Content />
      </div>
    </section>
  );
}

function truncate(str, max = 60) {
  if (!str) return "";
  if (str.length <= max) return str;
  const s = str.slice(0, max);
  const last = Math.max(s.lastIndexOf(" "), s.lastIndexOf(","));
  return (last > 40 ? s.slice(0, last) : s).trim() + "…";
}
