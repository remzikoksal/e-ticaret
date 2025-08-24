import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  to,                 
  image,
  title,
  subtitle,
  oldPrice,
  newPrice,
  colors = [],
}) => {
  const safeColors = colors.length ? colors : ["#23A6F0", "#23856D", "#E77C40", "#252B42"];
  const cover = image || "/placeholder.jpg";

  const Wrapper = to ? Link : "div";
  const wrapperProps = to ? { to, "aria-label": title || "Product", className: "block" } : { className: "block" };

  return (
    <Wrapper {...wrapperProps}>
      <article
        className="
          text-center space-y-2 rounded-2xl border overflow-hidden
          transition duration-200 cursor-pointer
          hover:shadow-lg hover:-translate-y-0.5
        "
      >
        <div className="w-full aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
          <img src={cover} alt={title} className="w-full h-full object-cover" />
        </div>

        <div>
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>

        <div className="space-x-2">
          <span className="line-through text-gray-400 text-sm">${oldPrice}</span>
          <span className="text-green-500 font-semibold text-sm">${newPrice}</span>
        </div>

        <div className="flex justify-center gap-2 pb-3">
          {safeColors.map((c, i) => (
            <span key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
      </article>
    </Wrapper>
  );
};

export default ProductCard;
