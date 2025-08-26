import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ChevronDown, LayoutGrid, List } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { fetchProducts, fetchCategoriesIfNeeded } from "../../store/thunks/productThunks";

const slugify = (str = "") =>
  str.toString().toLowerCase().trim()
    .replaceAll("ğ","g").replaceAll("ü","u").replaceAll("ş","s")
    .replaceAll("ı","i").replaceAll("ö","o").replaceAll("ç","c")
    .replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");


function TopBar({
  showingFrom,
  showingTo,
  totalResults,
  sort,
  onSortChange,
  filterInput,
  onFilterInputChange,
  onFilterSubmit,
  view,
  onViewChange,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      <div className="flex flex-col gap-4 items-center text-center md:flex-row md:items-center md:justify-between md:text-left">
        <p className="text-sm text-gray-600">
          Showing {showingFrom}-{showingTo} of {totalResults} results
        </p>

     
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600">Sort:</label>
           <select
  id="sort"
  value={sort}
  onChange={onSortChange}
  className="h-9 px-3 border rounded text-sm"
>
  <option value="">Default</option>
  <option value="price:asc">price: low</option>
  <option value="price:desc">price: high</option>
  <option value="rating:asc">rating: low</option>
  <option value="rating:desc">rating: high</option>
</select>
          </div>

          
          <form onSubmit={onFilterSubmit} className="flex items-center gap-2">
            <label htmlFor="filter" className="text-sm text-gray-600">Filter:</label>
            <input
              id="filter"
              type="text"
              value={filterInput}
              onChange={onFilterInputChange}
              placeholder="Type to filter…"
              className="h-9 px-3 border rounded text-sm w-48"
            />
            <button
              type="submit"
              className="rounded bg-[#23A6F0] text-white text-sm px-3 py-2 hover:opacity-90"
              title="Apply filter"
            >
              Filter
            </button>
          </form>
        </div>

      
        <div className="flex items-center gap-2 justify-center">
          <span className="text-sm text-gray-600">Views:</span>
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            className={`w-9 h-9 flex items-center justify-center rounded border hover:bg-gray-50 ${view === "grid" ? "border-[#23A6F0] text-[#23A6F0]" : ""}`}
            title="Grid view"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            className={`w-9 h-9 flex items-center justify-center rounded border hover:bg-gray-50 ${view === "list" ? "border-[#23A6F0] text-[#23A6F0]" : ""}`}
            title="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onFirst,
  onPrev,
  onNext,
  onGoto,
}) {
  if (totalPages <= 1) return null;
  const isFirstDisabled = page === 1;
  const isNextDisabled  = page === totalPages;
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="inline-flex items-stretch rounded-2xl overflow-hidden border shadow-sm">
        <button onClick={onFirst} disabled={isFirstDisabled}
          className={`px-6 h-12 text-sm font-semibold ${isFirstDisabled ? "text-gray-400 bg-white cursor-not-allowed" : "text-[#23A6F0] bg-white hover:bg-gray-50"}`}>
          First
        </button>
        <button onClick={onPrev} disabled={isFirstDisabled}
          className={`px-6 h-12 text-sm font-semibold border-l ${isFirstDisabled ? "text-gray-400 bg-white cursor-not-allowed" : "text-[#23A6F0] bg-white hover:bg-gray-50"}`}>
          Prev
        </button>
        <button onClick={() => onGoto(page)} className="px-6 h-12 text-sm font-semibold text-white bg-[#23A6F0] border-l" aria-current="page">
          {page}
        </button>
        {totalPages > page + 1 && (
          <span className="px-6 h-12 flex items-center justify-center text-sm text-gray-500 bg-white border-l">…</span>
        )}
        {totalPages > page && (
          <button onClick={() => onGoto(totalPages)} className="px-6 h-12 text-sm font-semibold text-[#23A6F0] bg-white border-l hover:bg-gray-50" title={`Go to page ${totalPages}`}>
            {totalPages}
          </button>
        )}
        <button onClick={onNext} disabled={isNextDisabled}
          className={`px-6 h-12 text-sm font-semibold border-l ${isNextDisabled ? "text-gray-400 bg-white cursor-not-allowed" : "text-[#23A6F0] bg-white hover:bg-gray-50"}`}>
          Next
        </button>
      </div>
    </div>
  );
}


export default function SectionTwo() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search, pathname } = useLocation();
  const { categoryId: categoryIdParam } = useParams();

  const { productList = [], total = 0, fetchState, categories = [] } =
    useSelector((s) => s.product || {});

 
  const pageSize = 12;
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");            
  const [filter, setFilter] = useState("");        
  const [filterInput, setFilterInput] = useState(""); 
  const [mobileView, setMobileView] = useState("list");

  const didInitFromQuery = useRef(false);
  const sectionRef = useRef(null);
  const didFirstFetch = useRef(false);  
  const prevCatRef = useRef(categoryIdParam);
  const prevPageRef = useRef(page);

 
  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  useEffect(() => {
    if (didInitFromQuery.current) return;
    didInitFromQuery.current = true;
    const sp = new URLSearchParams(search);
    const p = parseInt(sp.get("page") || "1", 10);
    const s = sp.get("sort") || "";
    const f = sp.get("filter") || "";
    if (p > 0) setPage(p);
    setSort(s);
    setFilter(f);
    setFilterInput(f); 
  }, [search]);

  useEffect(() => {
    const sp = new URLSearchParams(search);
    if (page > 1) sp.set("page", String(page)); else sp.delete("page");
    if (sort) sp.set("sort", sort); else sp.delete("sort");
    if (filter) sp.set("filter", filter); else sp.delete("filter");

    const newSearch = sp.toString();
    const current = search.startsWith("?") ? search.slice(1) : search;
    if (newSearch !== current) {
      history.replace({ pathname, search: newSearch });
    }
  
  }, [page, sort, filter, history, pathname]);

  
  const offset = (page - 1) * pageSize;
  useEffect(() => {
    const params = { limit: pageSize, offset };
    if (categoryIdParam) params.category = categoryIdParam;
    if (sort) params.sort = sort;
    if (filter) params.filter = filter;

    dispatch(fetchProducts(params));

    if (!didFirstFetch.current) {
      didFirstFetch.current = true; 
    }
  }, [dispatch, page, offset, pageSize, categoryIdParam, sort, filter]);

  
  useEffect(() => {
    if (!didFirstFetch.current) return;
    if (prevPageRef.current !== page) {
      prevPageRef.current = page;
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [page]);

 
  useEffect(() => {
    if (prevCatRef.current !== categoryIdParam) {
      prevCatRef.current = categoryIdParam;
      setPage(1);
    }
  }, [categoryIdParam]);

  const isLoading = fetchState === "FETCHING" && productList.length === 0;

 
  const findCategory = (id) => categories.find((c) => Number(c?.id) === Number(id));
  const genderOf = (catId) => {
    const c = findCategory(catId);
    const g = (c?.gender || "").toString().toLowerCase();
    if (g.includes("kad")) return "kadin";
    if (g.includes("erk")) return "erkek";
    return Number(catId) <= 8 ? "kadin" : "erkek";
  };
  const catNameOf = (catId) => findCategory(catId)?.name || "kategori";

  const normalized = useMemo(() => {
    return productList.map((p) => {
      const image =
        p?.images?.[0]?.url || p?.images?.[0] || p?.image || p?.imageUrl || "/placeholder.jpg";
      const newPrice = Number(p?.price ?? 0);
      const oldPrice = newPrice ? newPrice * 1.6 : 0;

      const catId = p?.category_id ?? p?.categoryId ?? p?.category?.id;
      const gender = genderOf(catId);
      const catName = catNameOf(catId);
      const sp = new URLSearchParams();
      if (page > 1) sp.set("page", String(page));
      if (sort) sp.set("sort", sort);
      if (filter) sp.set("filter", filter);
      const qs = sp.toString();

      const to = `/shop/${gender}/${slugify(catName)}/${catId}/${slugify(p?.name || "")}/${p?.id}${qs ? `?${qs}` : ""}`;

      return { id: p?.id, name: p?.name || "Product", image, newPrice, oldPrice, to };
    });
  }, [productList, categories, page, sort, filter]);

  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));
  const goFirst = () => setPage(1);
  const goPrev  = () => setPage((p) => Math.max(p - 1, 1));
  const goNext  = () => setPage((p) => Math.min(p + 1, totalPages));
  const goTo    = (n) => setPage(n);

  const showingFrom = total ? offset + 1 : 1;
  const showingTo   = total ? Math.min(offset + productList.length, total) : normalized.length;
  const totalResults = total || normalized.length;

  const handleSortChange = (e) => setSort(e.target.value);
  const handleFilterInputChange = (e) => setFilterInput(e.target.value);
  const handleFilterSubmit = (e) => {
    e?.preventDefault?.();
    if (page !== 1) setPage(1);
    setFilter(filterInput);
  };
  const handleViewChange = (v) => setMobileView(v);

 
  if (isLoading) {
    return (
      <section ref={sectionRef} className="bg-white">
        <TopBar
          showingFrom={showingFrom}
          showingTo={showingTo}
          totalResults={totalResults}
          sort={sort}
          onSortChange={handleSortChange}
          filterInput={filterInput}
          onFilterInputChange={handleFilterInputChange}
          onFilterSubmit={handleFilterSubmit}
          view={mobileView}
          onViewChange={handleViewChange}
        />
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
                    <span key={k} className="w-3 h-3 rounded-full bg-gray-200 animate-pulse" />
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
      <TopBar
        showingFrom={showingFrom}
        showingTo={showingTo}
        totalResults={totalResults}
        sort={sort}
        onSortChange={handleSortChange}
        filterInput={filterInput}
        onFilterInputChange={handleFilterInputChange}
        onFilterSubmit={handleFilterSubmit}
        view={mobileView}
        onViewChange={handleViewChange}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 md:hidden">
        <div className={`grid gap-y-12 ${mobileView === "grid" ? "grid-cols-2 gap-x-6" : "grid-cols-1"}`}>
          {normalized.map((p, idx) => (
            <ProductCard
              key={`m-${offset + idx}`}
              to={p.to}
              image={p.image}
              title={p.name}
              subtitle={"English Department"}
              oldPrice={p.oldPrice.toFixed(2)}
              newPrice={p.newPrice.toFixed(2)}
              colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
            />
          ))}
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onFirst={goFirst}
          onPrev={goPrev}
          onNext={goNext}
          onGoto={goTo}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 hidden md:block">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-12">
          {normalized.map((p, idx) => (
            <ProductCard
              key={`d-${offset + idx}`}
              to={p.to}
              image={p.image}
              title={p.name}
              subtitle={"English Department"}
              oldPrice={p.oldPrice.toFixed(2)}
              newPrice={p.newPrice.toFixed(2)}
              colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
            />
          ))}
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onFirst={goFirst}
          onPrev={goPrev}
          onNext={goNext}
          onGoto={goTo}
        />
      </div>
    </section>
  );
}
