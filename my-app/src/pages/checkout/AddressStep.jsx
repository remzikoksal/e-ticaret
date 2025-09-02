import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/axios";

const digitsOnly = (s = "") => s.replace(/\D/g, "");
const idOf = (a) => a?.id ?? a?.addressId ?? a?.ID;
function readApiError(e, fallback) {
  const msg =
    e?.response?.data?.message ||
    e?.response?.data?.error ||
    e?.message ||
    fallback;
  return typeof msg === "string" ? msg : fallback;
}


const CITIES = [
  "Adana","Adıyaman","Afyonkarahisar","Ağrı","Aksaray","Amasya","Ankara","Antalya","Ardahan","Artvin",
  "Aydın","Balıkesir","Bartın","Batman","Bayburt","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa",
  "Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Düzce","Edirne","Elazığ","Erzincan","Erzurum",
  "Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Iğdır","Isparta","İstanbul","İzmir",
  "Kahramanmaraş","Karabük","Karaman","Kars","Kastamonu","Kayseri","Kilis","Kırıkkale","Kırklareli",
  "Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa","Mardin","Mersin","Muğla","Muş","Nevşehir",
  "Niğde","Ordu","Osmaniye","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Şanlıurfa","Şırnak",
  "Tekirdağ","Tokat","Trabzon","Tunceli","Uşak","Van","Yalova","Yozgat","Zonguldak"
];

export default function AddressStep({ onContinue }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [addresses, setAddresses] = useState([]);
  const [shippingId, setShippingId] = useState(null);
  const [receiptId, setReceiptId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editAddr, setEditAddr] = useState(null);

  const [form, setForm] = useState({
    title: "",
    name: "",
    surname: "",
    phone: "", 
    city: "",
    district: "",
    neighborhood: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const isFormValid = useMemo(() => {
    return (
      form.title.trim() &&
      form.name.trim() &&
      form.surname.trim() &&
      form.phone.trim().length === 10 &&
      form.city.trim() &&
      form.district.trim() &&
      form.neighborhood.trim()
    );
  }, [form]);

  const canNext = Boolean(shippingId) && Boolean(receiptId);

  useEffect(() => {
    (async () => {
      setError("");
      try {
        const res = await api.get("/user/address");
        const data = res?.data;
        const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
        setAddresses(list);
        if (list.length) {
          const firstId = idOf(list[0]);
          setShippingId(firstId);
          setReceiptId(firstId);
        }
      } catch (e) {
        setError(readApiError(e, "Adres listesi alınamadı."));
      }
    })();
  }, []);

  const onChangeField = (key) => (e) => {
    let val = e.target.value;
    if (key === "phone") val = digitsOnly(val).slice(0, 10);
    setForm((f) => ({ ...f, [key]: val }));
  };

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = "Zorunlu.";
    if (!form.name.trim()) errs.name = "Zorunlu.";
    if (!form.surname.trim()) errs.surname = "Zorunlu.";
    if (!form.phone.trim()) errs.phone = "Zorunlu.";
    else if (form.phone.trim().length !== 10) errs.phone = "10 hane (53xxxxxxxx).";
    if (!form.city.trim()) errs.city = "Zorunlu.";
    if (!form.district.trim()) errs.district = "Zorunlu.";
    if (!form.neighborhood.trim()) errs.neighborhood = "Zorunlu.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function openAdd() {
    setEditAddr(null);
    setForm({
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
    });
    setFieldErrors({});
    setShowForm(true);
  }
  function openEdit(a) {
    setEditAddr(a);
    setForm({
      title: a.title || "",
      name: a.name || "",
      surname: a.surname || "",
      phone: (digitsOnly(a.phone || "") || "").slice(0, 10),
      city: a.city || "",
      district: a.district || "",
      neighborhood: a.neighborhood || "",
    });
    setFieldErrors({});
    setShowForm(true);
  }
  function closeForm() {
    setShowForm(false);
    setEditAddr(null);
    setFieldErrors({});
  }

  async function submit(e) {
    e?.preventDefault?.();
    if (!validate()) return;
    setLoading(true);
    setError("");
    try {
      if (editAddr && idOf(editAddr)) {
        const payload = { id: idOf(editAddr), ...form };
        await api.put("/user/address", payload);
        setAddresses((prev) =>
          prev.map((x) => (String(idOf(x)) === String(payload.id) ? { ...x, ...payload } : x))
        );
      } else {
        const res = await api.post("/user/address", form);
        const serverData = res?.data?.data ?? res?.data ?? {};
        const newItem = { ...serverData, ...form };
        if (!idOf(newItem)) newItem.id = Date.now();
        setAddresses((p) => [newItem, ...p]);
        const nid = idOf(newItem);
        setShippingId(nid);
        setReceiptId(nid);
      }
      closeForm();
    } catch (e) {
      setError(readApiError(e, "Adres kaydedilemedi."));
    } finally {
      setLoading(false);
    }
  }

  async function remove(aid) {
    if (!aid) return;
    setLoading(true);
    setError("");
    try {
      await api.delete(`/user/address/${aid}`);
      setAddresses((prev) => prev.filter((x) => String(idOf(x)) !== String(aid)));
      if (String(shippingId) === String(aid)) setShippingId(null);
      if (String(receiptId) === String(aid)) setReceiptId(null);
    } catch (e) {
      setError(readApiError(e, "Adres silinemedi."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddressSection
          radioName="shipping"
          title="Shipping Address"
          addresses={addresses}
          selectedId={shippingId}
          onSelect={setShippingId}
          onEdit={openEdit}
          onDelete={remove}
        />
        <AddressSection
          radioName="receipt"
          title="Receipt (Billing) Address"
          addresses={addresses}
          selectedId={receiptId}
          onSelect={setReceiptId}
          onEdit={openEdit}
          onDelete={remove}
        />
      </div>

      <div className="mt-6">
        {!showForm ? (
          <button
            type="button"
            onClick={openAdd}
            className="px-4 py-2 rounded border text-sm font-semibold hover:bg-gray-50"
          >
            Add Address
          </button>
        ) : (
          <form
            onSubmit={submit}
            className="bg-white border rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Field label="Address Title" error={fieldErrors.title}>
              <input
                className="input"
                type="text"
                placeholder="Örn: Ev"
                value={form.title}
                onChange={onChangeField("title")}
                required
              />
            </Field>

            <Field
              label="Phone"
              hint=" Örn: +90 531 212 34 56"
              error={fieldErrors.phone}
            >
              <input
                className="input"
                type="tel"
                inputMode="tel"
                placeholder="53x xxx xx xx"
                value={form.phone}
                onChange={onChangeField("phone")}
                required
              />
            </Field>

            <Field label="Name"  error={fieldErrors.name}>
              <input
                className="input"
                type="text"
                placeholder="Örn: Mehmet"
                value={form.name}
                onChange={onChangeField("name")}
                required
              />
            </Field>

            <Field label="Surname"  error={fieldErrors.surname}>
              <input
                className="input"
                type="text"
                placeholder="Örn: Gezer"
                value={form.surname}
                onChange={onChangeField("surname")}
                required
              />
            </Field>

            <Field label="City" hint="Şehri listeden seçin" error={fieldErrors.city}>
              <select
                className="input"
                value={form.city}
                onChange={onChangeField("city")}
                required
              >
                <option value="">Şehir seçin</option>
                {CITIES.map((c) => (
                  <option key={c} value={c.toLowerCase()}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="District"  error={fieldErrors.district}>
              <input
                className="input"
                type="text"
                placeholder="Örn: Esenler"
                value={form.district}
                onChange={onChangeField("district")}
                required
              />
            </Field>

            <div className="md:col-span-2">
              <Field
                label="Address (Street, building, door…)"
                hint="Cadde, bina ve kapı numarası dâhil ayrıntıları yazın"
                error={fieldErrors.neighborhood}
              >
                <textarea
                  className="input min-h-[84px]"
                  placeholder="Örn: Sağdık Cd. No:3 Kat:2 Daire:4"
                  value={form.neighborhood}
                  onChange={onChangeField("neighborhood")}
                  required
                />
              </Field>
            </div>

            <div className="md:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="px-4 py-2 rounded bg-[#23A6F0] text-white font-semibold disabled:opacity-60"
              >
                {editAddr ? "Update Address" : "Save Address"}
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

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={!canNext || loading}
          className="px-6 py-2 rounded bg-[#23A6F0] text-white font-bold disabled:opacity-60"
          onClick={() =>
            onContinue?.({ shippingId, receiptId })
          }
        >
          Continue
        </button>
      </div>
    </>
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

function AddressCard({ radioName, addr, selected, onSelect, onEdit, onDelete }) {
  const aid = idOf(addr);
  return (
    <div className={`p-3 border rounded-lg ${selected ? "border-[#23A6F0]" : "border-gray-200"}`}>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="radio"
          name={radioName}
          checked={selected}
          onChange={() => onSelect(aid)}
          className="mt-1 accent-[#23A6F0]"
        />
        <div className="min-w-0">
          <div className="font-semibold text-[#252B42]">{addr.title}</div>
          <div className="text-sm text-gray-600">
            {addr.name} {addr.surname}
          </div>
          <div className="text-sm text-gray-600">{addr.phone}</div>
          <div className="text-sm text-gray-600">
            {addr.neighborhood}
            {addr.district ? `, ${addr.district}` : ""} {addr.city ? ` / ${addr.city}` : ""}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="text-xs px-3 py-1 border rounded hover:bg-gray-50"
              onClick={() => onEdit(addr)}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-xs px-3 py-1 border rounded hover:bg-gray-50"
              onClick={() => onDelete(aid)}
            >
              Delete
            </button>
          </div>
        </div>
      </label>
    </div>
  );
}

function AddressSection({ radioName, title, addresses, selectedId, onSelect, onEdit, onDelete }) {
  return (
    <div>
      <h3 className="text-base font-bold text-[#252B42] mb-3">{title}</h3>
      <div className="space-y-3">
        {addresses.length === 0 ? (
          <div className="text-sm text-gray-500 border rounded p-3">No saved addresses.</div>
        ) : (
          addresses.map((a) => {
            const aid = idOf(a);
            return (
              <AddressCard
                key={aid}
                radioName={radioName}
                addr={a}
                selected={String(selectedId) === String(aid)}
                onSelect={onSelect}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
