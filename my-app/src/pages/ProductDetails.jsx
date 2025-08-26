import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { api } from "../lib/axios";
import { setSelectedProduct } from "../store/actions/productActions";

import Section1 from "./detail/Section1";
import Section2 from "./detail/Section2";
import Section3 from "./detail/Section3";
import Section4 from "./detail/Section4";

export default function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((s) => s.product || {});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    const normalizeImages = (data) => {
      const arr = Array.isArray(data?.images)
        ? data.images.map((it) => (typeof it === "string" ? it : it?.url))
        : [];
      return arr.filter(Boolean);
    };

    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${productId}`);
        const data = Array.isArray(res?.data) ? res.data[0] : res?.data || null;
        if (!alive) return;
        if (data) {
          dispatch(setSelectedProduct({ ...data, images: normalizeImages(data) }));
        } else {
          dispatch(setSelectedProduct(null));
        }
      } catch (e) {
        console.error("ProductDetail load error:", e);
        if (alive) dispatch(setSelectedProduct(null));
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [dispatch, productId]);

  const item = selectedProduct;

  if (loading) {
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
        <p className="text-red-600 font-semibold mb-4">Ürün bulunamadı veya yüklenemedi.</p>
      </main>
    );
  }

  return (
    <main>
      <div>
        <Section1 product={item} />
        <Section2 product={item} />
        <Section3 product={item} />
        <Section4 />
      </div>
    </main>
  );
}
