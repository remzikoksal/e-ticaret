import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  Mail,
  Phone,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Gravatar from "react-gravatar";

import { CLIENT_SET_USER } from "../store/reducers/clientReducer";
import { fetchCategoriesIfNeeded } from "../store/thunks/productThunks";
import { setCart } from "../store/actions/shoppingCartActions";

export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isShopOpen, setShopOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const userMenuRefDesktop = useRef(null);
  const userMenuRefMobile = useRef(null);
  const shopMenuRef = useRef(null);
  const shopToggleRef = useRef(null);
  const cartContainerRef = useRef(null); 
  const cartToggleRef = useRef(null);
  const user = useSelector((s) => s.client?.user);
  const categories = useSelector((s) => s.product?.categories || []);
  const cart = useSelector((s) => s.shoppingCart?.cart || []);
  const cartCount = cart.reduce((acc, it) => acc + (it?.count || 0), 0);
  const goCheckout = () => {
  setCartOpen(false);
  if (user) history.push("/checkout");
  else history.push("/login");
};

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  useEffect(() => {
    const handler = (e) => {
      const inDesktop = userMenuRefDesktop.current?.contains(e.target);
      const inMobile = userMenuRefMobile.current?.contains(e.target);
      if (!inDesktop && !inMobile) setUserMenuOpen(false);
    };
    if (userMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  useEffect(() => {
    const onDocDown = (e) => {
      const inMenu = shopMenuRef.current?.contains(e.target);
      const inToggle = shopToggleRef.current?.contains(e.target);
      if (!inMenu && !inToggle) setShopOpen(false);
    };
    if (isShopOpen) document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [isShopOpen]);

  useEffect(() => {
    const onDown = (e) => {
      const inMenu = cartContainerRef.current?.contains(e.target);
      const inToggle = cartToggleRef.current?.contains(e.target);
      if (!inMenu && !inToggle) setCartOpen(false);
    };
    if (cartOpen) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [cartOpen]);

  useEffect(() => {
    const unlisten = history.listen(() => {
      setShopOpen(false);
      setCartOpen(false);
      setUserMenuOpen(false);
      setMobileMenuOpen(false);
    });
    return () => unlisten && unlisten();
  }, [history]);

  const normalize = (s = "") =>
    String(s)
      .toLowerCase()
      .replaceAll("ş", "s")
      .replaceAll("ı", "i")
      .replaceAll("ğ", "g")
      .replaceAll("ç", "c")
      .replaceAll("ö", "o")
      .replaceAll("ü", "u");
  const slugify = (s = "") =>
    normalize(s).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const getImg = (c) =>
    c?.img ||
    c?.image ||
    c?.image_url ||
    c?.imageUrl ||
    c?.thumbnail ||
    c?.icon ||
    c?.logo ||
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' fill='%23e5e7eb'/></svg>";
  const getName = (c) =>
    c?.name ??
    c?.title ??
    c?.label ??
    c?.category ??
    c?.category_name ??
    c?.categoryName ??
    c?.slug ??
    "";

  const hasWomanFlag = (c) => {
    const g = normalize(c?.gender || c?.sex || c?.type || "");
    return (
      g.includes("kadin") ||
      g.includes("women") ||
      g.includes("woman") ||
      g.includes("female")
    );
  };
  const hasManFlag = (c) => {
    const g = normalize(c?.gender || c?.sex || c?.type || "");
    return (
      g.includes("erkek") || g.includes("men") || g.includes("man") || g.includes("male")
    );
  };
  const isIdWoman = (id) => Number(id) >= 1 && Number(id) <= 8;
  const isIdMan = (id) => Number(id) >= 9 && Number(id) <= 14;

  const orderWomen = [
    "t-shirt",
    "shoe",
    "jacket",
    "dress",
    "skirt",
    "shirt",
    "jumper",
    "trousers",
  ];
  const orderMen = ["t-shirt", "shoe", "jacket", "dress", "shirt", "jumper", "trousers"];

  const nameKey = (c) => normalize(getName(c));

  const { womenCats, menCats } = useMemo(() => {
    const womens = [];
    const mens = [];
    (categories || []).forEach((c) => {
      if (hasWomanFlag(c) || (!hasManFlag(c) && isIdWoman(c.id))) womens.push(c);
      else if (hasManFlag(c) || isIdMan(c.id)) mens.push(c);
    });

    const wIndex = new Map(orderWomen.map((n, i) => [n, i]));
    const mIndex = new Map(orderMen.map((n, i) => [n, i]));

    womens.sort(
      (a, b) => (wIndex.get(nameKey(a)) ?? 999) - (wIndex.get(nameKey(b)) ?? 999)
    );
    mens.sort(
      (a, b) => (mIndex.get(nameKey(a)) ?? 999) - (mIndex.get(nameKey(b)) ?? 999)
    );

    return { womenCats: womens, menCats: mens };
  }, [categories]);

  const catLink = (c, gender) => {
    const g = gender || (isIdWoman(c.id) || hasWomanFlag(c) ? "kadin" : "erkek");
    const nameSlug = slugify(getName(c) || "kategori");
    return `/shop/${g}/${nameSlug}/${c.id}`;
  };

  const closeAllMenus = () => {
    setShopOpen(false);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setCartOpen(false);
  };

  const parsePrice = (v) => {
    if (v == null) return 0;
    if (typeof v === "number") return v;
    const s = String(v).replaceAll(",", "").replace(/[^\d.-]/g, "");
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };
  const priceOf = (p) => parsePrice(p?.price ?? p?.unit_price ?? p?.amount ?? 0);
  const formatUSD = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  const totalPrice = cart.reduce(
    (sum, it) => sum + (it?.count || 0) * priceOf(it?.product),
    0
  );

  const incItem = (pid) => {
    const next = cart.map((it) =>
      String(it?.product?.id) === String(pid)
        ? { ...it, count: (it.count || 0) + 1 }
        : it
    );
    dispatch(setCart(next));
  };

  const decItem = (pid) => {
    const next = cart
      .map((it) =>
        String(it?.product?.id) === String(pid)
          ? { ...it, count: (it.count || 0) - 1 }
          : it
      )
      .filter((it) => (it.count || 0) > 0);
    dispatch(setCart(next));
  };

  const handleLogout = (e) => {
    e?.preventDefault?.();
    dispatch({ type: CLIENT_SET_USER, payload: null });
    localStorage.removeItem("token");
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    try {
      history.replace("/");
    } catch {}
    setTimeout(() => {
      if (window.location.pathname !== "/") window.location.assign("/");
    }, 10);
  };

  return (
    <header>
      <div className="hidden md:block bg-[#2E2F41] text-white text-sm py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone size={16} />
              <span>(225) 555-0118</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail size={16} />
              <span>michelle.rivera@example.com</span>
            </div>
          </div>

          <p className="font-semibold text-sm">
            Follow Us and get a chance to win 80% off
          </p>

          <div className="flex items-center gap-3">
            <span>Follow Us :</span>
            <Instagram size={16} />
            <Youtube size={16} />
            <Facebook size={16} />
            <Twitter size={16} />
          </div>
        </div>
      </div>

      <div className="bg-white py-4 shadow-sm relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold">
            <Link to="/" className="hover:opacity-80" onClick={closeAllMenus}>
              Bandage
            </Link>
          </h1>

          <nav className="hidden md:flex gap-4 text-gray-600 font-semibold text-sm relative">
            <Link to="/" className="hover:underline" onClick={closeAllMenus}>
              Home
            </Link>

            <div className="relative" ref={shopToggleRef}>
              <div className="hover:text-black flex items-center gap-1">
                <Link to="/shop" className="hover:text-black" onClick={closeAllMenus}>
                  Shop
                </Link>
                <button
                  type="button"
                  onClick={() => setShopOpen((prev) => !prev)}
                  className="hover:text-black flex items-center"
                  aria-haspopup="menu"
                  aria-expanded={isShopOpen}
                  title="Shop menüsünü aç"
                >
                  <ChevronDown className="w-[20px] h-[15px] text-[#252B42]" />
                </button>
              </div>

              {isShopOpen && (
                <div
                  ref={shopMenuRef}
                  role="menu"
                  className="absolute top-full mt-2 left-0 bg-white shadow-md rounded border w-[320px] z-50 p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Kadın</h4>
                      <ul className="space-y-2 text-gray-600 font-semibold">
                        {womenCats.length === 0 && (
                          <li className="text-sm text-gray-400">Loading…</li>
                        )}
                        {womenCats.map((c) => (
                          <li key={c.id}>
                            <Link
                              to={catLink(c, "kadin")}
                              className="flex items-center gap-2 hover:text-blue-500"
                              onClick={closeAllMenus}
                            >
                              <img
                                src={getImg(c)}
                                alt={getName(c)}
                                className="w-5 h-5 rounded object-cover border border-gray-200"
                                loading="lazy"
                              />
                              <span className="truncate">{getName(c)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Erkek</h4>
                      <ul className="space-y-2 text-gray-600 font-semibold">
                        {menCats.length === 0 && (
                          <li className="text-sm text-gray-400">Loading…</li>
                        )}
                        {menCats.map((c) => (
                          <li key={c.id}>
                            <Link
                              to={catLink(c, "erkek")}
                              className="flex items-center gap-2 hover:text-blue-500"
                              onClick={closeAllMenus}
                            >
                              <img
                                src={getImg(c)}
                                alt={getName(c)}
                                className="w-5 h-5 rounded object-cover border border-gray-200"
                                loading="lazy"
                              />
                              <span className="truncate">{getName(c)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className="hover:text-black" onClick={closeAllMenus}>
              About
            </Link>
            <Link to="/contact" className="hover:text-black" onClick={closeAllMenus}>
              Contact
            </Link>
            <a href="#" onClick={closeAllMenus}>
              Pages
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={userMenuRefDesktop}>
                <button
                  type="button"
                  className="flex items-center gap-2"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                >
                  <Gravatar
                    email={user.email}
                    size={28}
                    className="rounded-full"
                    default="mp"
                    alt={user.name || user.email}
                  />
                  <span className="text-sm font-medium text-[#252B42]">
                    {user.name || user.email}
                  </span>
                  <ChevronDown size={16} className="text-[#252B42]" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50 py-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left text-red-500 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 text-sm">
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-[#23A6F0]"
                  onClick={closeAllMenus}
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
                <span className="text-gray-400">/</span>
                <Link to="/signup" className="text-[#23A6F0]" onClick={closeAllMenus}>
                  Register
                </Link>
              </div>
            )}

            <Search size={20} className="text-gray-600" />

            <div className="relative" ref={cartToggleRef}>
              <button
                type="button"
                className="flex items-center gap-1"
                onClick={() => setCartOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={cartOpen}
                title="Open cart"
              >
                <ShoppingCart size={20} className="text-gray-600" />
                <span className="text-sm">{cartCount}</span>
              </button>

              {cartOpen && (
                <div
                  ref={cartContainerRef}
                  role="menu"
                  className="absolute right-0 mt-2 w-[340px] bg-white border rounded-md shadow-lg z-50 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 pt-3 pb-2 text-[14px] font-semibold text-[#252B42]">
                    My cart ({cartCount} items)
                  </div>

                  <div className="max-h-[360px] overflow-auto divide-y">
                    {cart.length === 0 ? (
                      <div className="px-4 py-6 text-sm text-gray-500">
                        Your cart is empty
                      </div>
                    ) : (
                      cart.map((item) => {
                        const p = item.product || {};
                        const pid = p.id;
                        const title =
                          p.name || p.title || p.label || `#${pid || ""}`;
                        const img =
                          p.image ||
                          p.image_url ||
                          p.imageUrl ||
                          (Array.isArray(p.images) ? p.images[0] : null);
                        const price = priceOf(p);

                        return (
                          <div key={pid} className="flex gap-3 px-4 py-3 items-center">
                            <div className="w-12 h-12 rounded border overflow-hidden bg-gray-50 shrink-0">
                              {img ? (
                                <img
                                  src={img}
                                  alt={title}
                                  className="w-full h-full object-cover"
                                />
                              ) : null}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-[#252B42] truncate">
                                {title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatUSD(price)}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                aria-label="Decrease"
                                onClick={() => decItem(pid)}
                                className="w-7 h-7 rounded border grid place-items-center hover:bg-gray-50"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-sm">
                                {item.count}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase"
                                onClick={() => incItem(pid)}
                                className="w-7 h-7 rounded border grid place-items-center hover:bg-gray-50"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
                    <span className="text-sm font-semibold text-[#252B42]">
                      Total
                    </span>
                    <span className="text-base font-bold text-[#23A6F0]">
                      {formatUSD(totalPrice)}
                    </span>
                  </div>

                  <div className="flex gap-3 p-3 border-t bg-white">
                    <Link
                      to="/cart"
                      className="flex-1 border rounded px-4 py-2 text-sm font-semibold text-[#252B42] hover:bg-gray-50 text-center"
                      onClick={() => setCartOpen(false)}
                    >
                      Go to Cart
                    </Link>
                   <button
                      type="button"
                      onClick={goCheckout}
                      className="flex-1 bg-[#23A6F0] text-white rounded px-4 py-2 text-sm font-semibold text-center hover:opacity-90"
                    >
                      Checkout
                    </button>

                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Heart size={20} className="text-gray-600" />
              <span className="text-sm">0</span>
            </div>
          </div>

         <div className="flex md:hidden items-center gap-3">
           <Search size={20} />
           <button
             type="button"
             onClick={() => setCartOpen(true)}
             aria-label="Open cart"
             className="flex items-center gap-1"
           >
             <ShoppingCart size={20} />
             <span className="text-xs font-semibold">{cartCount}</span>
           </button>
           <Menu size={24} onClick={() => setMobileMenuOpen(true)} />
         </div>

        </div>

        {cartOpen && (
          <div className="md:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setCartOpen(false)}
            />
            <div
              ref={cartContainerRef}
              className="absolute bottom-0 inset-x-0 bg-white rounded-t-2xl shadow-2xl max-h-[75vh] overflow-hidden"
            >
              <div className="px-5 pt-4 pb-3 flex items-center justify-between">
                <div className="text-[15px] font-semibold text-[#252B42]">
                  My cart ({cartCount} items)
                </div>
                <button
                  className="p-1 rounded hover:bg-gray-100"
                  onClick={() => setCartOpen(false)}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[55vh] overflow-auto divide-y">
                {cart.length === 0 ? (
                  <div className="px-5 py-8 text-sm text-gray-500">Your cart is empty</div>
                ) : (
                  cart.map((item) => {
                    const p = item.product || {};
                    const pid = p.id;
                    const title =
                      p.name || p.title || p.label || `#${pid || ""}`;
                    const img =
                      p.image ||
                      p.image_url ||
                      p.imageUrl ||
                      (Array.isArray(p.images) ? p.images[0] : null);
                    const price = priceOf(p);

                    return (
                      <div key={pid} className="flex gap-3 px-5 py-4 items-center">
                        <div className="w-14 h-14 rounded border overflow-hidden bg-gray-50 shrink-0">
                          {img ? (
                            <img
                              src={img}
                              alt={title}
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-[#252B42] truncate">
                            {title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatUSD(price)}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label="Decrease"
                            onClick={() => decItem(pid)}
                            className="w-8 h-8 rounded border grid place-items-center hover:bg-gray-50"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-7 text-center text-sm">
                            {item.count}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase"
                            onClick={() => incItem(pid)}
                            className="w-8 h-8 rounded border grid place-items-center hover:bg-gray-50"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex items-center justify-between px-5 py-4 border-t bg-white">
                <span className="text-sm font-semibold text-[#252B42]">Total</span>
                <span className="text-base font-bold text-[#23A6F0]">
                  {formatUSD(totalPrice)}
                </span>
              </div>

              <div className="flex gap-3 p-4 border-t bg-white">
                <Link
                  to="/cart"
                  className="flex-1 border rounded px-4 py-2 text-sm font-semibold text-[#252B42] hover:bg-gray-50 text-center"
                  onClick={() => setCartOpen(false)}
                >
                  Go to Cart
                </Link>
                <button
                       type="button"
                       onClick={goCheckout}
                       className="flex-1 bg-[#23A6F0] text-white rounded px-4 py-2 text-sm font-semibold text-center hover:opacity-90"
                     >
                       Checkout
                     </button>
              </div>
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white px-4 pb-4">
            <div className="flex justify-end">
              <X size={24} onClick={() => setMobileMenuOpen(false)} />
            </div>
            <nav className="flex flex-col items-center gap-4 text-gray-600 font-semibold text-xl mt-4">
              <Link to="/" onClick={closeAllMenus}>
                Home
              </Link>
              <Link to="/shop" onClick={closeAllMenus}>
                Shop
              </Link>
              <Link to="/about" onClick={closeAllMenus}>
                About
              </Link>
              <Link to="/contact" onClick={closeAllMenus}>
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
