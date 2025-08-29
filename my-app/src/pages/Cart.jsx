import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Minus } from "lucide-react";
import { setCart } from "../store/actions/shoppingCartActions";
import { useHistory } from "react-router-dom";

const CART_STORAGE_KEY = "shopping_cart";

export default function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((s) => s.shoppingCart?.cart || []);
  const payment = useSelector((s) => s.shoppingCart?.payment || {});
  const user = useSelector((s) => s.client?.user);
  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem("cart");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) dispatch(setCart(parsed));
    } catch {}
  
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const parsePrice = (v) => {
    if (v == null) return 0;
    if (typeof v === "number") return v;
    const s = String(v).replaceAll(",", "").replace(/[^\d.-]/g, "");
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };
  const priceOf = (p) => parsePrice(p?.price ?? p?.unit_price ?? p?.amount ?? 0);
  const usd = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  const inc = (pid) =>
    dispatch(
      setCart(
        cart.map((it) =>
          String(it.product?.id) === String(pid)
            ? { ...it, count: (it.count || 0) + 1 }
            : it
        )
      )
    );

  const dec = (pid) =>
    dispatch(
      setCart(
        cart.map((it) => {
          if (String(it.product?.id) !== String(pid)) return it;
          const next = Math.max(1, (it.count || 0) - 1); 
          return { ...it, count: next };
        })
      )
    );

  const remove = (pid) =>
    dispatch(setCart(cart.filter((it) => String(it.product?.id) !== String(pid))));
  const toggle = (pid) =>
    dispatch(
      setCart(
        cart.map((it) =>
          String(it.product?.id) === String(pid) ? { ...it, checked: !it.checked } : it
        )
      )
    );

  const productsTotal = cart
    .filter((it) => it.checked)
    .reduce((sum, it) => sum + (it.count || 0) * priceOf(it.product), 0);
  const shipping = parsePrice(payment.shippingPrice ?? payment.shipping ?? 29.99);
  const discount = parsePrice(payment.discount ?? 29.99);
  const grandTotal = productsTotal + shipping - discount;
  const handleCreateOrder = () => {
    if (user) history.push("/checkout");
    else history.push("/login");
  };

  return (
    <main className="mx-auto px-6 py-8 max-w-[1200px]">
      <div className="flex items-baseline gap-3 mb-6">
        <h1 className="text-[34px] leading-none font-extrabold text-[#252B42]">
          My Cart
        </h1>
        <span className="text-[#737373]">
          ( {cart.length} item{cart.length !== 1 ? "s" : ""} )
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="space-y-5">
          <div className="hidden lg:grid grid-cols-12 text-[12px] tracking-wide font-semibold text-[#737373] px-1">
            <div className="col-span-6">PRODUCT</div>
            <div className="col-span-2 text-center">QUANTITY</div>
            <div className="col-span-2 text-center">PRICE</div>
            <div className="col-span-2 text-right">ACTION</div>
          </div>
          <hr className="hidden lg:block border-gray-200 mt-2 mb-5" />

          {cart.map((it) => {
            const p = it.product || {};
            const pid = p.id;
            const title = p.name || p.title || p.label || `#${pid || ""}`;
            const sub = p.short_description || p.subtitle || p.description || "";
            const img =
              p.image ||
              p.image_url ||
              p.imageUrl ||
              (Array.isArray(p.images) ? p.images[0] : null);

            const unit = priceOf(p);
            const line = unit * (it.count || 0);

            return (
              <article
                key={pid}
                className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
          
                  <div className="col-span-12 lg:col-span-6 flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="accent-[#23A6F0] w-[18px] h-[18px]"
                      checked={!!it.checked}
                      onChange={() => toggle(pid)}
                    />
            
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                      {img ? (
                        <img src={img} alt={title} className="w-full h-full object-contain" />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[16px] font-bold text-[#252B42] truncate">
                        {title}
                      </div>
                      {sub && (
                        <div className="text-[13px] text-[#737373] truncate">{sub}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6 lg:col-span-2 flex justify-start lg:justify-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dec(pid)}
                        className="w-8 h-8 rounded border border-gray-300 grid place-items-center hover:bg-gray-50"
                        aria-label="Decrease"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{it.count}</span>
                      <button
                        onClick={() => inc(pid)}
                        className="w-8 h-8 rounded border border-gray-300 grid place-items-center hover:bg-gray-50"
                        aria-label="Increase"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-6 lg:col-span-2 text-left lg:text-center">
                    <div className="text-[#252B42] font-extrabold">{usd(line)}</div>
                    <div className="text-[12px] text-[#737373]">Unit: {usd(unit)}</div>
                  </div>

                  <div className="col-span-12 lg:col-span-2 flex lg:justify-end">
                    <button
                      onClick={() => remove(pid)}
                      className="px-5 py-2 text-sm border rounded hover:bg-gray-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <aside>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm lg:sticky lg:top-20">
            <h2 className="text-[20px] font-extrabold text-[#252B42] mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-[15px]">
              <SummaryRow label="Products total" value={usd(productsTotal)} />
              <SummaryRow label="Shipping" value={usd(shipping)} />
              <SummaryRow
                label="Discount"
                value={`-${usd(discount)}`}
                valueClass="text-[#2BA24C] font-semibold"
              />
              <hr className="my-2 border-gray-200" />
              <SummaryRow
                label={<span className="font-semibold">Total</span>}
                value={<span className="font-bold">{usd(grandTotal)}</span>}
              />
            </div>

            <button
              type="button"
              onClick={handleCreateOrder}
              className="mt-4 w-full bg-[#23A6F0] text-white rounded-md py-3 font-bold hover:opacity-90"
            >
              Create Order
            </button>

            <p className="text-center text-[12px] text-[#737373] mt-3">
              Free shipping for orders over $150.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function SummaryRow({ label, value, valueClass = "" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#737373]">{label}</span>
      <span className={`text-[#252B42] ${valueClass}`}>{value}</span>
    </div>
  );
}
