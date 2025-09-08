import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/axios";

const PAGE_SIZE = 4;

const toStr = (v) => String(v ?? "");
const digitsOnly = (s) => toStr(s).replace(/\D/g, "");
const money = (n) => `$${Number(n || 0).toFixed(2)}`;
const fmtDate = (d) => {
  const dt = d ? new Date(d) : new Date();
  return dt.toLocaleString();
};
const idOf = (o, idx) => o?.id ?? o?.order_id ?? o?.orderId ?? idx;

function pickImage(p) {
  if (p?.image) return p.image;
  if (p?.img) return p.img;
  if (p?.imageUrl) return p.imageUrl;
  if (p?.url) return p.url;

  if (p?.product?.image) return p.product.image;
  if (p?.product?.thumbnail) return p.product.thumbnail;
  if (Array.isArray(p?.product?.images) && p.product.images.length) {
    const cand = p.product.images[0];
    if (typeof cand === "string") return cand;
    if (cand?.url) return cand.url;
    if (cand?.src) return cand.src;
  }

  if (Array.isArray(p?.images) && p.images.length) {
    const cand = p.images[0];
    if (typeof cand === "string") return cand;
    if (cand?.url) return cand.url;
    if (cand?.src) return cand.src;
  }

  return null;
}
function normalizeOrder(raw, idx) {
  const id = idOf(raw, idx);
  const date = raw.order_date || raw.created_at || raw.createdAt || raw.date;
  const status = raw.status || raw.order_status || raw.state || "Completed";
  const total = raw.price ?? raw.total ?? raw.grand_total ?? null;
  const shipping = raw.shipping ?? raw.shipping_price ?? 0;
  const discount = raw.discount ?? 0;
  const cardLast4 = digitsOnly(raw.card_no).slice(-4);

  const srcItems = raw.products || raw.items || [];
  const items = Array.isArray(srcItems)
    ? srcItems.map((p, i) => {
        const idp = p.product_id ?? p.id ?? i;
        const name =
          p.name || p.title || p.product?.name || p.product?.title || `Product #${idp}`;
        const image = pickImage(p);
        const price = p.price ?? p.unit_price ?? p.product?.price ?? p.amount ?? 0;
        const count = p.count ?? p.qty ?? p.quantity ?? 1;
        const detail = p.detail || p.variant || "";
        return { id: idp, name, image, price: Number(price) || 0, count: Number(count) || 1, detail };
      })
    : [];

  return { id, date, status, total, shipping, discount, cardLast4, items };
}

export default function PreviousOrders() {
  const [orders, setOrders] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);

  async function loadOrders() {
    setLoading(true);
    setErr("");
    try {
      const res = await api.get("/order");
      const data = res?.data;
      const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
      setOrders(list);
      setPage(1);
      setOpenId(null);
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Orders could not be loaded.";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(page, 1), totalPages);
  const start = (pageSafe - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paged = orders.slice(start, end);

  return (
    <main className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#252B42]">Previous Orders</h1>
        <div className="flex items-center gap-2">
          <Link to="/" className="px-3 py-1.5 text-sm text-white bg-[#23A6F0] border rounded hover:bg-blue-500">
            Ana menü
          </Link>
          <button
            type="button"
            onClick={loadOrders}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border rounded hover:bg-gray-50"
            title="Yenile"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
              <path fill="currentColor" d="M12 6V3L8 7l4 4V8a4 4 0 1 1-4 4H6a6 6 0 1 0 6-6z"/>
            </svg>
            <span className="hidden sm:inline">Yenile</span>
          </button>
        </div>
      </div>

      {err && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {err}
        </div>
      )}

      <div className="border rounded-lg bg-white overflow-hidden">
        {loading ? (
          <div className="p-4 text-sm text-gray-600">Loading…</div>
        ) : paged.length === 0 ? (
          <div className="p-4 text-sm text-gray-600">You have no previous orders.</div>
        ) : (
          <ul>
            {paged.map((raw, idxInPage) => {
              const idxGlobal = start + idxInPage;
              const ord = normalizeOrder(raw, idxGlobal);

             const itemsTotal = ord.items.reduce(
                  (s, it) => s + (Number(it.price) || 0) * (Number(it.count) || 1),0 );
              const shipping = Number(ord.shipping ?? 0);
              const discount = Number(ord.discount ?? 0);
              const grandTotal =
                ord.total != null ? Number(ord.total) : Math.max(0, itemsTotal + shipping - discount);

              const isOpen = String(openId) === String(ord.id);

              return (
                <li key={ord.id} className="border-b last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpenId((x) => (String(x) === String(ord.id) ? null : ord.id))}
                    className="w-full text-left px-3 sm:px-4 py-3"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <div className="text-sm font-semibold text-[#252B42]">#{ord.id}</div>
                      <div className="text-sm text-gray-600">{fmtDate(ord.date)}</div>
                      <div className="ml-auto flex items-center gap-3">
                        <span className="text-sm font-semibold">{money(grandTotal)}</span>
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-100 text-gray-900">
                          {ord.status || "—"}
                        </span>
                        <span className="text-[#252B42] opacity-70">{isOpen ? "▲" : "▼"}</span>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-3 sm:px-4 pb-4">
                      <ul className="divide-y rounded-lg border">
                        {ord.items.map((it, i) => {
                          const src = pickImage(it) || it.image;
                          const line = (Number(it.price) || 0) * (Number(it.count) || 1);
                          return (
                            <li
                              key={`${it.id}-${i}`}
                              className="px-3 py-2 text-sm flex items-center gap-3"
                            >
                              <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 shrink-0">
                                {src ? (
                                  <img
                                    src={toStr(src)}
                                    alt={it.name || `Item ${i + 1}`}
                                    className="w-12 h-12 object-cover"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="w-12 h-12 grid place-items-center text-[10px] text-gray-500">
                                    No Image
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-[#252B42] truncate">
                                  {it.name || `Product #${it.id}`}
                                </div>
                                {it.detail ? (
                                  <div className="text-xs text-gray-500 mt-0.5">{it.detail}</div>
                                ) : null}
                                <div className="text-[13px] text-gray-600 mt-0.5">
                                  Qty: <b>{it.count}</b> · Price: <b>{money(line)}</b>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="mt-3 text-sm flex items-center justify-between">
                        <span className="text-gray-500">Toplam</span>
                        <span className="font-semibold">{money(grandTotal)}</span>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className="px-3 sm:px-4 py-3 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Page {pageSafe} / {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-1.5 text-sm border rounded disabled:opacity-50 hover:bg-gray-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pageSafe <= 1}
            >
              Prev
            </button>
            <button
              type="button"
              className="px-3 py-1.5 text-sm border rounded disabled:opacity-50 hover:bg-gray-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={pageSafe >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
