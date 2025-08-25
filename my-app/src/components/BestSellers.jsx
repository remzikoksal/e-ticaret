import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../store/thunks/productThunks";

const BestSellers = () => {
  const dispatch = useDispatch();
  const { productList = [], fetchState } = useSelector((s) => s.product || {});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const isLoading = fetchState === 'FETCHING' && productList.length === 0;

  
  const items = productList.slice(0, 8).map((p) => {
    const image =
      p?.images?.[0]?.url || p?.images?.[0] || p?.image || p?.imageUrl || "/placeholder.jpg";
    const title = p?.name || "Product";
    const newPrice = Number(p?.price ?? 0);
    const oldPrice = newPrice ? newPrice * 1.6 : 0;
    return { ...p, image, title, newPrice, oldPrice };
  });

  if (isLoading) {
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
        {items.map((p, index) => (
          <ProductCard
            key={p?.id ?? index}
            id={p?.id}
            to={`/product/${p?.id}`}
            image={p.image}
            title={p.title}
            subtitle={"English Department"}
            oldPrice={p.oldPrice.toFixed(2)}
            newPrice={p.newPrice.toFixed(2)}
            colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
