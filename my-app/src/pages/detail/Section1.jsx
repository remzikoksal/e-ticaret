import React from "react";

export default function Section1({ product, fillMode = "cover", bg = "bg-[#FAFAFA]" }) {
  const {
    name = "",
    price = 0,
    stock = 0,
    rating = 0,
    description = "",
    images = [],
  } = product || {};

  const list = (Array.isArray(images) ? images : [])
    .map((it) => (typeof it === "string" ? it : it?.url))
    .filter(Boolean);

  const main = list[0] || "/placeholder.jpg";

  const priceText = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(price || 0));

  const imgFit = fillMode === "contain" ? "object-contain" : "object-cover";

  return (

    <section className={`${bg} w-full`}>
    
      <div className="max-w-7xl mx-auto px-6 md:px-4 py-6 md:py-8">
    
        <nav className="text-sm text-gray-500 mb-8 md:mb-10">
          <ol className="list-reset flex gap-2">
            <li>
              <a href="/" className="text-[#252B42] font-semibold hover:text-[#23A6F0]">Home</a>
            </li>
            <li>&gt;</li>
            <li>
              <a href="/shop" className="text-[#252B42] hover:text-[#23A6F0]">Shop</a>
            </li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
       
          <div className="relative">
            <div className="overflow-hidden border">
              <img
                src={main}
                alt={name}
                className={`w-full h-[420px] md:h-[550px] ${imgFit}`}
              />
            </div>
          </div>

     
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#252B42]">
              {name}
            </h1>

            <div className="flex items-center gap-4 text-base md:text-sm">
              <Stars value={Number(rating) || 0} />
              <span className="text-[#737373]">10 Reviews</span>
            </div>

            <div className="text-[26px] font-bold text-black">{priceText}</div>

            <div className="text-sm">
              <span className="text-[#737373] font-semibold">Availability :</span>{" "}
              {Number(stock) > 0 ? (
                <span className="text-[#23A6F0] font-semibold">In Stock</span>
              ) : (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              )}
            </div>

        
            {description && (
              <p className="text-base text-[#737373] leading-7">{description}</p>
            )}
            <hr className="border-[#BDBDBD]" />

          
            <div className="flex items-center gap-4 md:gap-2">
              {["#23A6F0", "#23856D", "#E77C40", "#2C3A4B"].map((c, i) => (
                <span
                  key={i}
                  className="w-10 h-10 md:w-8 md:h-8 rounded-full border"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button className="px-6 py-3 md:px-4 md:py-2 rounded bg-[#23A6F0] text-white text-sm font-semibold hover:opacity-90">
                Select Options
              </button>

              {/* Beğenme */}
              <IconBtn title="Wishlist" imgSrc="/icons/actions/heart.png" btnClass="w-12 h-12 md:w-9 md:h-9" imgClass="w-6 h-6 md:w-4 md:h-4" />
              {/* Sepet */}
              <IconBtn title="Cart" imgSrc="/icons/actions/cart.png" btnClass="w-12 h-12 md:w-9 md:h-9" imgClass="w-6 h-6 md:w-4 md:h-4" />
              {/* İzleme */}
              <IconBtn title="Watch" imgSrc="/icons/actions/eye.png" btnClass="w-12 h-12 md:w-9 md:h-9" imgClass="w-6 h-6 md:w-4 md:h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IconBtn({ title, imgSrc, btnClass = "w-9 h-9", imgClass = "w-4 h-4", children }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      className={`${btnClass} bg-white rounded-full border grid place-items-center hover:bg-[#FAFAFA]`}
    >
      {imgSrc ? (
        <img src={imgSrc} alt="" className={imgClass} />
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#737373">
          {children}
        </svg>
      )}
    </button>
  );
}

function Stars({ value = 0 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const active = i < full || (i === full && half);
        return (
          <svg
            key={i}
            width="20"  
            height="20"
            viewBox="0 0 24 24"
            fill={active ? "#FBBF24" : "none"}
            stroke="#FBBF24"
          >
            <path d="M12 17.3l-6.18 3.64 1.64-7.03L2 8.9l7.19-.61L12 1.5l2.81 6.79 7.19.61-5.46 5.01 1.64 7.03z" />
          </svg>
        );
      })}
    </div>
  );
}
