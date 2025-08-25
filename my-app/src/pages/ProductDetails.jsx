import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../store/thunks/productThunks";
import { api } from "../lib/axios";

import Section1 from "./detail/Section1";
import Section2 from "./detail/Section2";
import Section3 from "./detail/Section3";
import Section4 from "./detail/Section4";

export default function ProductDetail() {
  const { productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { productList = [], fetchState } = useSelector((s) => s.product || {});
  const [item, setItem] = React.useState(null);
  const [status, setStatus] = React.useState("loading"); 

 
  React.useEffect(() => {
    if (!productList.length) dispatch(fetchProducts());
  }, [dispatch, productList.length]);

  React.useEffect(() => {
    let alive = true;
    setStatus("loading");

    const idNum = Number(productId);

  
    const inStore =
      productList.find(
        (p) => Number(p?.id) === idNum || String(p?.id) === String(productId)
      ) || null;

    const normalizeImages = (data) => {
      const arr = Array.isArray(data?.images)
        ? data.images
            .map((it) => (typeof it === "string" ? it : it?.url))
            .filter(Boolean)
        : [];
      return arr;
    };

    if (inStore) {
      const images = normalizeImages(inStore);
      if (alive) {
        setItem({ ...inStore, images });
        setStatus("done");
      }
      return () => {
        alive = false;
      };
    }

    
    (async () => {
      try {
        const res = await api.get(`/products/${productId}`);
        const data = Array.isArray(res?.data) ? res.data[0] : res?.data;
        if (!alive) return;

        if (data && (data.id || data.productId)) {
          const images = normalizeImages(data);
          setItem({ ...data, images });
        } else {
          setItem(null);
        }
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
  }, [productId, productList, fetchState]);

  if (status === "loading" || (fetchState === "FETCHING" && !item)) {
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
        <Section4 />
      </div>
    </main>
  );
}
