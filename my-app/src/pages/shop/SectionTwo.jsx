import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, LayoutGrid, List } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { fetchProducts } from "../../store/thunks/productThunks";

export default function SectionTwo() {
  const dispatch = useDispatch();
  const { productList = [], total = 0, fetchState } = useSelector(
    (s) => s.product || {}
  );

 
  const pageSize = 12;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * pageSize;

 
  const sectionRef = useRef(null);


  const [mobileView, setMobileView] = useState("list");

  useEffect(() => {
    dispatch(fetchProducts({ limit: pageSize, offset }));
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [dispatch, page, pageSize, offset]);

  const isLoading = fetchState === "FETCHING" && productList.length === 0;


  const normalized = useMemo(() => {
    return productList.map((p) => {
      const image =
        p?.images?.[0]?.url ||
        p?.images?.[0] ||
        p?.image ||
        p?.imageUrl ||
        "/placeholder.jpg";
      const newPrice = Number(p?.price ?? 0);
      const oldPrice = newPrice ? newPrice * 1.6 : 0;
      return {
        id: p?.id,
        name: p?.name || "Product",
        image,
        newPrice,
        oldPrice,
      };
    });
  }, [productList]);

  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));
  const goFirst = () => setPage(1);
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goTo = (n) => setPage(n);

  const showingFrom = total ? offset + 1 : 1;
  const showingTo = total
    ? Math.min(offset + productList.length, total)
    : normalized.length;

  const TopBar = (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      <div className="flex flex-col items-center text-center gap-4 md:flex-row md:items-center md:justify-between md:text-left">
        <p className="text-sm text-gray-600">
          Showing {showingFrom}-{showingTo} of {total || normalized.length} results
        </p>

        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
          <span className="text-sm text-gray-600">Views:</span>
          <div className="flex items-center gap-2">
       
            <button
              type="button"
              onClick={() => setMobileView("grid")}
              className={`w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-50 ${
                mobileView === "grid" ? "border-[#23A6F0] text-[#23A6F0]" : ""
              }`}
              title="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
         
            <button
              type="button"
              onClick={() => setMobileView("list")}
              className={`w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-50 ${
                mobileView === "list" ? "border-[#23A6F0] text-[#23A6F0]" : ""
              }`}
              title="List view"
            >
              <List size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <button
            type="button"
            className="flex items-center justify-between gap-2 border rounded px-3 py-2 text-sm min-w-32"
            title="Sort by"
          >
            <span>Popularity</span>
            <ChevronDown size={16} />
          </button>
          <button
            type="button"
            className="rounded bg-[#23A6F0] text-white text-sm px-4 py-2 hover:opacity-90"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );

  
  const Pagination = () => {
    if (totalPages <= 1) return null;
    const isFirstDisabled = page === 1;
    const isNextDisabled = page === totalPages;

    return (
      <div className="mt-10 flex items-center justify-center">
        <div className="inline-flex items-stretch rounded-2xl overflow-hidden border shadow-sm">
          {/* First */}
          <button
            onClick={goFirst}
            disabled={isFirstDisabled}
            className={`px-6 h-12 text-sm font-semibold ${
              isFirstDisabled
                ? "text-gray-400 bg-white cursor-not-allowed"
                : "text-[#23A6F0] bg-white hover:bg-gray-50"
            }`}
          >
            First
          </button>

          <button
            onClick={() => goTo(page)}
            className="px-6 h-12 text-sm font-semibold text-white bg-[#23A6F0]"
            aria-current="page"
          >
            {page}
          </button>

    
          {totalPages > page + 1 && (
            <span className="px-6 h-12 flex items-center justify-center text-sm text-gray-500 bg-white border-l">
              …
            </span>
          )}

         
          {totalPages > page && (
            <button
              onClick={() => goTo(totalPages)}
              className="px-6 h-12 text-sm font-semibold text-[#23A6F0] bg-white border-l hover:bg-gray-50"
              title={`Go to page ${totalPages}`}
            >
              {totalPages}
            </button>
          )}

        
          <button
            onClick={goNext}
            disabled={isNextDisabled}
            className={`px-6 h-12 text-sm font-semibold border-l ${
              isNextDisabled
                ? "text-gray-400 bg-white cursor-not-allowed"
                : "text-[#23A6F0] bg-white hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <section ref={sectionRef} className="bg-white">
        {TopBar}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-12">
            {Array.from({ length: pageSize }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="w-full aspect-[4/5] rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-2/3 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-1/2 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/3 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="flex justify-center gap-2">
                  {Array.from({ length: 4 }).map((__, k) => (
                    <span
                      key={k}
                      className="w-3 h-3 rounded-full bg-gray-200 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center py-6">
            <span className="inline-block h-6 w-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-white">
      {TopBar}

      <div className="max-w-7xl mx-auto px-4 py-8 md:hidden">
        <div
          className={`grid gap-y-12 ${
            mobileView === "grid" ? "grid-cols-2 gap-x-6" : "grid-cols-1"
          }`}
        >
          {normalized.map((p, idx) => (
            <ProductCard
              key={`m-${offset + idx}`}
              to={`/product/${p.id}`}
              image={p.image}
              title={p.name}
              subtitle={"English Department"}
              oldPrice={p.oldPrice.toFixed(2)}
              newPrice={p.newPrice.toFixed(2)}
              colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
            />
          ))}
        </div>
      
        <Pagination />
      </div>

    
      <div className="max-w-7xl mx-auto px-4 py-8 hidden md:block">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-12">
          {normalized.map((p, idx) => (
            <ProductCard
              key={`d-${offset + idx}`}
              to={`/product/${p.id}`}
              image={p.image}
              title={p.name}
              subtitle={"English Department"}
              oldPrice={p.oldPrice.toFixed(2)}
              newPrice={p.newPrice.toFixed(2)}
              colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
            />
          ))}
        </div>

        <Pagination />
      </div>
    </section>
  );
}
