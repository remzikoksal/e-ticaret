import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { api } from "../lib/axios";

const digitsOnly = (s = "") => (s || "").replace(/\D/g, "");
const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function OrderSuccess() {
  const history = useHistory();
  const { state } = useLocation();

  const [summary, setSummary] = useState(state?.orderSummary || null);
  const [orderId, setOrderId] = useState(state?.orderId || state?.orderSummary?.orderId || null);
  const [addressBook, setAddressBook] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (summary) return;
    try {
      const raw = sessionStorage.getItem("last_order");
      if (raw) {
        const parsed = JSON.parse(raw);
        setSummary(parsed);
        if (!orderId && parsed?.orderId) setOrderId(parsed.orderId);
      }
    } catch {
    }
  }, [summary, orderId]);

  useEffect(() => {
    if (summary || !orderId) return;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/order/${orderId}`);
        const data = res?.data?.data ?? res?.data ?? null;
        if (data) {
          const items = Array.isArray(data.products)
            ? data.products.map((p) => ({
                id: p.product_id || p.id,
                name: p.name || p.title || `Product #${p.product_id || p.id}`,
                image: p.image || p.img || null,
                price: p.price || p.unit_price || null,
                count: p.count || 1,
                detail: p.detail || "",
              }))
            : [];

          const s = {
            orderId,
            orderDate: data.order_date || data.created_at || new Date().toISOString(),
            totals: {
              itemsTotal: data.items_total ?? data.subtotal ?? null,
              shipping: data.shipping ?? 0,
              discount: data.discount ?? 0,
              grandTotal: data.price ?? data.total ?? null,
            },
            card: {
              name: data.card_name || "",
              last4: (digitsOnly(data.card_no) || "").slice(-4),
            },
            addressId: data.address_id,
            items,
          };
          setSummary(s);
        } else {
          setError("Sipariş detayları alınamadı.");
        }
      } catch {
        setError("Sipariş detayları alınamadı.");
      } finally {
        setLoading(false);
      }
    })();
  }, [summary, orderId]);

  const addressId = summary?.addressId;
  useEffect(() => {
    if (!addressId) return;
    (async () => {
      try {
        const res = await api.get("/user/address");
        const list = Array.isArray(res?.data) ? res.data : (Array.isArray(res?.data?.data) ? res.data.data : []);
        setAddressBook(list);
      } catch {
      }
    })();
  }, [addressId]);

  const addressText = useMemo(() => {
    if (!addressId || !addressBook.length) return null;
    const a = addressBook.find((x) => String(x.id ?? x.addressId ?? x.ID) === String(addressId));
    if (!a) return null;
    const line1 = [a.name, a.surname].filter(Boolean).join(" ");
    const line2 = [a.neighborhood, a.district, a.city].filter(Boolean).join(", ");
    return {
      title: a.title,
      phone: a.phone,
      line1,
      line2,
    };
  }, [addressBook, addressId]);

  const totals = summary?.totals || {};
  const items = summary?.items || [];

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center">
        <div className="inline-block px-6 py-3 rounded-full bg-green-100 text-green-700 font-semibold mb-6">
          Order Completed
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#252B42] mb-2">
          Thank you for your order!
        </h1>
        <p className="text-gray-600">
          {orderId ? <>Your order number is <b>#{orderId}</b>.</> : "Your order has been received."}
        </p>
        {summary?.orderDate ? (
          <p className="text-gray-500 text-sm mt-1">
            Order date: {new Date(summary.orderDate).toLocaleString()}
          </p>
        ) : null}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 border rounded-lg bg-white">
          <header className="px-4 py-3 border-b">
            <h2 className="text-base font-semibold text-[#252B42]">Order Items</h2>
          </header>
          {loading ? (
            <div className="p-4 text-sm text-gray-600">Loading…</div>
          ) : items.length ? (
            <ul className="divide-y">
              {items.map((it, idx) => {
                const lineTotal = it.price != null ? (Number(it.price) * Number(it.count || 1)) : null;
                return (
                  <li key={idx} className="p-4 flex items-center gap-3">
                    {it.image ? (
                      <img src={it.image} alt={it.name || `Item ${idx+1}`} className="w-16 h-16 object-cover rounded" />
                    ) : (
                      <div className="w-16 h-16 rounded bg-gray-100 grid place-items-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#252B42] truncate">
                        {it.name || `Product #${it.id}`}
                      </div>
                      {it.detail ? (
                        <div className="text-xs text-gray-500 mt-0.5">Detail: {it.detail}</div>
                      ) : null}
                      <div className="text-sm text-gray-600 mt-1">
                        Qty: <b>{it.count}</b>
                        {it.price != null ? (
                          <>
                            {"  "}· Unit: <b>{money(it.price)}</b>
                            {"  "}· Line: <b>{money(lineTotal)}</b>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-600">No items found for this order.</div>
          )}
        </section>

        <aside className="border rounded-lg bg-white">
          <header className="px-4 py-3 border-b">
            <h2 className="text-base font-semibold text-[#252B42]">Summary</h2>
          </header>
          <div className="p-4 text-sm space-y-2">
            <div className="flex justify-between"><span>Products</span><b>{totals.itemsTotal != null ? money(totals.itemsTotal) : "—"}</b></div>
            <div className="flex justify-between"><span>Shipping</span><b>{money(totals.shipping ?? 0)}</b></div>
            <div className="flex justify-between"><span>Discount</span><b>- {money(totals.discount ?? 0)}</b></div>
            <div className="h-px my-2 bg-gray-200" />
            <div className="flex justify-between text-[#252B42] text-base font-bold">
              <span>Grand Total</span><span>{totals.grandTotal != null ? money(totals.grandTotal) : "—"}</span>
            </div>

            {summary?.card ? (
              <div className="mt-4 text-gray-600">
                <div className="font-semibold text-[#252B42] mb-1">Payment</div>
                <div>{summary.card.name}</div>
                {summary.card.last4 ? <div>Card ending in **** {summary.card.last4}</div> : null}
              </div>
            ) : null}

            {addressText ? (
              <div className="mt-4 text-gray-600">
                <div className="font-semibold text-[#252B42] mb-1">Shipping Address</div>
                <div className="text-[#252B42]">{addressText.title}</div>
                <div>{addressText.line1}</div>
                <div>{addressText.line2}</div>
                {addressText.phone ? <div>Phone: {addressText.phone}</div> : null}
              </div>
            ) : null}
          </div>
        </aside>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link to="/shop" className="px-5 py-2 rounded border font-semibold hover:bg-gray-50">
          Continue Shopping
        </Link>
        <button
          type="button"
          onClick={() => history.push("/")}
          className="px-5 py-2 rounded bg-[#23A6F0] text-white font-semibold"
        >
          Go to Home
        </button>
      </div>

      {error ? (
        <div className="mt-4 text-center text-sm text-red-600">{error}</div>
      ) : null}
    </main>
  );
}
