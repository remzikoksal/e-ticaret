import React from "react";
import { Link } from "react-router-dom";

function normalizeSrc(src) {
  if (!src) return "/placeholder.jpg";            
  if (/^https?:\/\//i.test(src)) return src;     
  if (src.startsWith("/")) return src;            
  return "/" + src.replace(/^\.?\//, "");
}

export default function ProductCard({
  to = "#",
  image,
  title,
  subtitle,
  oldPrice,
  newPrice,
  colors = [],
}) {
  const finalSrc = normalizeSrc(image);

  return (
    <Link
      to={to}
      className="block group cursor-pointer transition-transform duration-150 hover:-translate-y-0.5"
      title={title}
    >
      <div className="w-full aspect-[4/5] rounded overflow-hidden border bg-white">
        <img
          src={finalSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
          loading="lazy"
        />
      </div>

      <div className="text-center mt-4">
        <h3 className="text-[#252B42] font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-sm text-[#737373] mt-1">{subtitle}</p>
        )}
        <div className="flex items-baseline justify-center gap-2 mt-2">
          {oldPrice && (
            <span className="text-[#BDBDBD] line-through font-semibold">
              {oldPrice}
            </span>
          )}
          {newPrice && (
            <span className="text-[#23856D] font-bold">{newPrice}</span>
          )}
        </div>

        {Array.isArray(colors) && colors.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-3">
            {colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border"
                style={{ backgroundColor: c }}
                title="Color"
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
