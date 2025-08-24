import React from "react";

export default function Section2({
  product,
  activeTab = "additional",  
  bg = "bg-white",
}) {
  const {
    name = "",
    description = "",
    images = [],
    features = [],
  } = product || {};

 
  const list = (Array.isArray(images) ? images : [])
    .map((it) => (typeof it === "string" ? it : it?.url))
    .filter(Boolean);

  
  const hero = list[1] || list[0] || "/placeholder.jpg";

  const heading = "the quick fox jumps over";
  const paragraph =
    description ||
    "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.";

  const bulletItems =
    features.length > 0
      ? features
      : [
          "the quick fox jumps over the lazy dog",
          "the quick fox jumps over the lazy dog",
          "the quick fox jumps over the lazy dog",
          "the quick fox jumps over the lazy dog",
        ];

  return (
    <section className={`${bg} w-full`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      
        <div className="flex justify-center">
          <ul className="inline-flex items-center gap-8 text-sm font-semibold text-[#737373]">
            <TabItem label="Description" active={activeTab === "description"} />
            <TabItem label="Additional Information" active={activeTab === "additional"} />
            <li className="pb-4">
              <span className="mr-1">Reviews</span>
              <span className="text-[#23A6F0]">(0)</span>
            </li>
          </ul>
        </div>
        <hr className="border-gray-200" />

     
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-10 lg:gap-14 pt-10 items-start">
     
          <div className="rounded-2xl overflow-hidden border bg-white self-start">
            <img
              src={hero}
              alt={name || "product image"}
              className="w-full h-[520px] object-cover"
            />
          </div>

        
          <div className="space-y-6 self-start">
            <h3 className="mt-0 text-[28px] leading-tight md:text-[32px] font-extrabold text-[#252B42]">
              {heading}
            </h3>
            <p className="text-[#737373] leading-7">{paragraph}</p>
            <p className="text-[#737373] leading-7">{paragraph}</p>
            <p className="text-[#737373] leading-7">{paragraph}</p>
          </div>

          <div className="space-y-8 self-start">
       
            <div className="space-y-6">
              <h3 className="mt-0 text-[28px] leading-tight md:text-[32px] font-extrabold text-[#252B42]">
                {heading}
              </h3>
              <Bullets items={bulletItems} />
            </div>
      
            <div className="space-y-6">
              <h3 className="mt-0 text-[28px] leading-tight md:text-[32px] font-extrabold text-[#252B42]">
                {heading}
              </h3>
              <Bullets items={bulletItems} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function TabItem({ label, active }) {
  return (
    <li className={`pb-4 ${active ? "text-[#252B42]" : ""}`}>
      {label}
    </li>
  );
}

function Bullets({ items = [] }) {
  return (
    <ul className="space-y-5">
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-3">
          <Chevron className="mt-1 shrink-0" />
          <span className="text-[#737373] font-sans leading-4">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Chevron({ className = "" }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#737373"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
