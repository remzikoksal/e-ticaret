import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCart, setPayment, setAddress } from "../../store/actions/shoppingCartActions";

const digitsOnly = (s = "") => s.replace(/\D/g, "");
const idOf = (a) => a?.id ?? a?.cardId ?? a?.ID;
function maskCardNo(no) {
  const s = digitsOnly(no || "");
  if (s.length < 16) return s.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  const masked = `${s.slice(0, 4)} **** **** ${s.slice(-4)}`;
  return masked.replace(/(\d{4}|\*{4})(?=\d|\*)/g, "$1 ").trim();
}
function readApiError(e, fallback) {
  const msg =
    e?.response?.data?.message ||
    e?.response?.data?.error ||
    e?.message ||
    fallback;
  return typeof msg === "string" ? msg : fallback;
}
const thisYear = new Date().getFullYear();

export default function PaymentStep({ onBack, addressSelection }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((s) => s.shoppingCart?.cart || []);
  const payment = useSelector((s) => s.shoppingCart?.payment || {}); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editCard, setEditCard] = useState(null);

  const [form, setForm] = useState({
    card_no: "",
    expire_month: "",
    expire_year: "",
    name_on_card: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [ccv, setCcv] = useState("");
  const ccvValid = useMemo(
    () => digitsOnly(ccv).length >= 3 && digitsOnly(ccv).length <= 4,
    [ccv]
  );

  useEffect(() => {
    (async () => {
      setError("");
      try {
        const res = await api.get("/user/card");
        const data = res?.data;
        const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
        setCards(list);
        if (list.length) {
          const cid = idOf(list[0]);
          setSelectedCardId(cid);
          tryFetchOptions(list[0]);
        }
      } catch (e) {
        setError(readApiError(e, "Kartlar alınamadı."));
      }
    })();
  }, []);

  const selectedItems = useMemo(() => cart.filter((i) => i?.checked), [cart]);

  const productsPayload = useMemo(
    () =>
      selectedItems.map((it) => ({
        product_id: it?.product?.id,
        count: it?.count ?? 1,
        detail: it?.detail || it?.product?.detail || "",
      })),
    [selectedItems]
  );

  const itemsTotal = useMemo(
    () =>
      selectedItems.reduce(
        (sum, it) => sum + (Number(it?.product?.price) || 0) * (it?.count ?? 1),
        0
      ),
    [selectedItems]
  );

  const shipping = Number(payment?.shippingPrice ?? payment?.shipping ?? 0);
  const discount = Number(payment?.discount ?? 0);
  const grandTotal = Math.max(0, itemsTotal + shipping - discount);
  const cardFormValid = useMemo(() => {
    const month = Number(form.expire_month);
    const year = Number(form.expire_year);
    return (
      digitsOnly(form.card_no).length === 16 &&
      month >= 1 &&
      month <= 12 &&
      year >= thisYear &&
      form.name_on_card.trim()
    );
  }, [form]);

  const prettyCardNo = (val) =>
    digitsOnly(val).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();

  const onChange = (key) => (e) => {
    let val = e.target.value;
    if (key === "card_no") val = digitsOnly(val).slice(0, 16);
    if (key === "expire_month") {
      val = digitsOnly(val).slice(0, 2);
      if (Number(val) > 12) val = "12";
    }
    if (key === "expire_year") val = digitsOnly(val).slice(0, 4);
    setForm((f) => ({ ...f, [key]: val }));
  };

  function validate() {
    const m = Number(form.expire_month);
    const y = Number(form.expire_year);
    const errs = {};
    if (digitsOnly(form.card_no).length !== 16)
      errs.card_no = "Kart numarası 16 hane olmalı.";
    if (!m || m < 1 || m > 12) errs.expire_month = "Ay 1–12 arasında olmalı.";
    if (!y || y < thisYear) errs.expire_year = `Yıl en az ${thisYear} olmalı.`;
    if (!form.name_on_card.trim()) errs.name_on_card = "Kart üzerindeki isim zorunlu.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function openAdd() {
    setEditCard(null);
    setForm({ card_no: "", expire_month: "", expire_year: "", name_on_card: "" });
    setFieldErrors({});
    setShowForm(true);
  }
  function openEdit(card) {
    setEditCard(card);
    setForm({
      card_no: digitsOnly(card.card_no || "").slice(0, 16),
      expire_month: String(card.expire_month ?? ""),
      expire_year: String(card.expire_year ?? ""),
      name_on_card: card.name_on_card || "",
    });
    setFieldErrors({});
    setShowForm(true);
  }
  function closeForm() {
    setShowForm(false);
    setEditCard(null);
    setFieldErrors({});
  }

  async function submitCard(e) {
    e?.preventDefault?.();
    if (!validate()) return;
    setError("");
    try {
      if (editCard && idOf(editCard)) {
        const payload = {
          id: idOf(editCard),
          card_no: digitsOnly(form.card_no),
          expire_month: Number(form.expire_month),
          expire_year: Number(form.expire_year),
          name_on_card: form.name_on_card.trim(),
        };
        await api.put("/user/card", payload);
        setCards((prev) =>
          prev.map((x) => (String(idOf(x)) === String(payload.id) ? { ...x, ...payload } : x))
        );
        setSelectedCardId(payload.id);
        tryFetchOptions({ ...editCard, ...payload });
      } else {
        const payload = {
          card_no: digitsOnly(form.card_no),
          expire_month: Number(form.expire_month),
          expire_year: Number(form.expire_year),
          name_on_card: form.name_on_card.trim(),
        };
        const res = await api.post("/user/card", payload);
        const server = res?.data?.data ?? res?.data ?? {};
        const newItem = { ...server, ...payload };
        if (!idOf(newItem)) newItem.id = Date.now();
        setCards((p) => [newItem, ...p]);
        const nid = idOf(newItem);
        setSelectedCardId(nid);
        tryFetchOptions(newItem);
      }
      closeForm();
    } catch (e) {
      setError(readApiError(e, "Kart kaydedilemedi."));
    }
  }

  async function removeCard(cid) {
    if (!cid) return;
    setError("");
    try {
      await api.delete(`/user/card/${cid}`);
      setCards((prev) => prev.filter((x) => String(idOf(x)) !== String(cid)));
      if (String(selectedCardId) === String(cid)) {
        setSelectedCardId(null);
        setPaymentOptions([]);
      }
    } catch (e) {
      setError(readApiError(e, "Kart silinemedi."));
    }
  }

  async function tryFetchOptions(card) {
    const bin = digitsOnly(card?.card_no || "").slice(0, 6);
    if (bin.length < 6) {
      setPaymentOptions([]);
      return;
    }
    try {
      const res = await api.get("/payment/options", { params: { bin } });
      const list = res?.data?.data ?? res?.data ?? [];
      setPaymentOptions(Array.isArray(list) ? list : []);
    } catch {
      try {
        const res2 = await api.get("/user/card/options", { params: { bin } });
        const list2 = res2?.data?.data ?? res2?.data ?? [];
        setPaymentOptions(Array.isArray(list2) ? list2 : []);
      } catch {
        setPaymentOptions([]);
      }
    }
  }

  const selectedCard =
    cards.find((c) => String(idOf(c)) === String(selectedCardId)) || null;

  const canPlaceOrder =
    selectedCard &&
    ccvValid &&
    productsPayload.length > 0 &&
    addressSelection?.shippingId;

  async function placeOrder() {
    if (!canPlaceOrder) return;
    setLoading(true);
    setError("");
    try {
      const summarySnapshot = {
        orderId: null, 
        orderDate: new Date().toISOString(),
        addressId: addressSelection.shippingId,
        card: {
          name: selectedCard.name_on_card,
          last4: digitsOnly(selectedCard.card_no).slice(-4),
        },
        totals: {
          itemsTotal,
          shipping,
          discount,
          grandTotal,
        },
        items: selectedItems.map((it) => ({
          id: it?.product?.id,
          name: it?.product?.name || it?.product?.title,
          image: it?.product?.images?.[0] || it?.product?.image || null,
          price: Number(it?.product?.price) || 0,
          count: it?.count ?? 1,
          detail: it?.detail || it?.product?.detail || "",
        })),
      };

      const payload = {
        address_id: addressSelection.shippingId,
        order_date: new Date().toISOString(),
        card_no: digitsOnly(selectedCard.card_no),
        card_name: selectedCard.name_on_card,
        card_expire_month: Number(selectedCard.expire_month),
        card_expire_year: Number(selectedCard.expire_year),
        card_ccv: Number(digitsOnly(ccv)),
        price: Number(grandTotal.toFixed(2)),
        products: productsPayload,
      };

      const res = await api.post("/order", payload);
      const server = res?.data?.data ?? res?.data ?? {};
      const orderId = server?.id || server?.order_id;
      const finalSummary = { ...summarySnapshot, orderId };
      try {
        sessionStorage.setItem("last_order", JSON.stringify(finalSummary));
      } catch {}

      dispatch(setCart([]));
      dispatch(setPayment({}));
      dispatch(setAddress({}));

      history.push("/order-success", { orderId, orderSummary: finalSummary });
    } catch (e) {
      setError(readApiError(e, "Sipariş oluşturulamadı. Lütfen bilgileri kontrol edin."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {error && (
        <div className="lg:col-span-2 mb-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}

      <section>
        <h3 className="text-base font-bold text-[#252B42] mb-3">Saved Cards</h3>
        <div className="space-y-3">
          {cards.length === 0 ? (
            <div className="text-sm text-gray-500 border rounded p-3">No saved cards.</div>
          ) : (
            cards.map((c) => {
              const cid = idOf(c);
              return (
                <div
                  key={cid}
                  className={`p-3 border rounded-lg ${
                    String(selectedCardId) === String(cid) ? "border-[#23A6F0]" : "border-gray-200"
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="card"
                      checked={String(selectedCardId) === String(cid)}
                      onChange={() => {
                        setSelectedCardId(cid);
                        tryFetchOptions(c);
                      }}
                      className="mt-1 accent-[#23A6F0]"
                    />
                    <div className="min-w-0">
                      <div className="font-semibold text-[#252B42]">{c.name_on_card}</div>
                      <div className="text-sm text-gray-600">{maskCardNo(c.card_no)}</div>
                      <div className="text-sm text-gray-600">
                        Expires: {String(c.expire_month).padStart(2, "0")}/{c.expire_year}
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          className="text-xs px-3 py-1 border rounded hover:bg-gray-50"
                          onClick={() => openEdit(c)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-xs px-3 py-1 border rounded hover:bg-gray-50"
                          onClick={() => removeCard(cid)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </label>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-4">
          {!showForm ? (
            <button
              type="button"
              onClick={openAdd}
              className="px-4 py-2 rounded border text-sm font-semibold hover:bg-gray-50"
            >
              Add New Card
            </button>
          ) : (
            <form onSubmit={submitCard} className="bg-white border rounded-lg p-4 grid grid-cols-1 gap-4">
              <Field label="Card Number" hint="Yalnızca rakam (16 hane)" error={fieldErrors.card_no}>
                <input
                  className="input"
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 1234 1234 1234"
                  value={prettyCardNo(form.card_no)}
                  onChange={(e) => onChange("card_no")({ target: { value: e.target.value } })}
                  required
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Expire Month" hint="1 - 12" error={fieldErrors.expire_month}>
                  <input
                    className="input"
                    type="text"
                    inputMode="numeric"
                    placeholder="MM"
                    value={form.expire_month}
                    onChange={onChange("expire_month")}
                    required
                  />
                </Field>
                <Field label="Expire Year" hint={`≥ ${thisYear}`} error={fieldErrors.expire_year}>
                  <input
                    className="input"
                    type="text"
                    inputMode="numeric"
                    placeholder="YYYY"
                    value={form.expire_year}
                    onChange={onChange("expire_year")}
                    required
                  />
                </Field>
              </div>

              <Field label="Name on Card"  error={fieldErrors.name_on_card}>
                <input
                  className="input"
                  type="text"
                  placeholder="Örn: Remzi Köksal"
                  value={form.name_on_card}
                  onChange={onChange("name_on_card")}
                  required
                />
              </Field>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!cardFormValid || loading}
                  className="px-4 py-2 rounded bg-[#23A6F0] text-white font-semibold disabled:opacity-60"
                >
                  {editCard ? "Update Card" : "Save Card"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 rounded border font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    
      <section>
        <h3 className="text-base font-bold text-[#252B42] mb-3">Payment Options</h3>
        <div className="border rounded-lg p-4 bg-white min-h-[140px]">
          {selectedCardId ? (
            paymentOptions.length ? (
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {paymentOptions.map((opt, i) => (
                  <li key={i}>
                    {opt.title || opt.name || `Option ${i + 1}`}{" "}
                    {opt.detail ? <span className="text-gray-500">— {opt.detail}</span> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                Bu kart için özel ödeme seçeneği bulunamadı (veya backend henüz cevap vermedi).
              </p>
            )
          ) : (
            <p className="text-sm text-gray-500">Lütfen bir kart seçin.</p>
          )}
        </div>

     
        <div className="mt-4 grid grid-cols-1 gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="CCV" hint="Kartın arkasındaki 3 haneli güvenlik kodu">
              <input
                className="input"
                type="text"
                inputMode="numeric"
                placeholder="123"
                value={ccv}
                onChange={(e) => setCcv(digitsOnly(e.target.value).slice(0, 4))}
                required
              />
            </Field>

            <div className="border rounded-lg p-3 text-sm bg-white">
              <div className="flex justify-between"><span>Products</span><b>${itemsTotal.toFixed(2)}</b></div>
              <div className="flex justify-between"><span>Shipping</span><b>${shipping.toFixed(2)}</b></div>
              <div className="flex justify-between"><span>Discount</span><b>- ${discount.toFixed(2)}</b></div>
              <div className="h-px my-2 bg-gray-200" />
              <div className="flex justify-between text-[#252B42] text-base font-bold">
                <span>Grand Total</span><span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {productsPayload.length === 0 && (
            <div className="text-[13px] text-red-600">Sepete eklenmiş (ve seçili) ürün bulunmuyor.</div>
          )}
          {!addressSelection?.shippingId && (
            <div className="text-[13px] text-red-600">Lütfen bir kargo adresi seçin.</div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            className="px-4 py-2 rounded border font-semibold hover:bg-gray-50"
            onClick={onBack}
          >
            Back
          </button>
          <button
            type="button"
            disabled={!canPlaceOrder || loading}
            className="px-6 py-2 rounded bg-[#23A6F0] text-white font-bold disabled:opacity-60"
            onClick={placeOrder}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children, hint, error }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-semibold text-[#252B42] mb-1">
        {label}
      </span>
      {children}
      {hint ? <p className="mt-1 text-[12px] text-gray-500">{hint}</p> : null}
      {error ? <p className="mt-1 text-[12px] text-red-600">{error}</p> : null}
      <style>{`.input{width:100%;border:1px solid #E5E7EB;border-radius:8px;padding:10px;outline:none} .input:focus{box-shadow:0 0 0 3px rgba(35,166,240,.2);border-color:#23A6F0}`}</style>
    </label>
  );
}
