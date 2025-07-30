
const ProductCard = ({ image, title, subtitle, oldPrice, newPrice, colors }) => {
  return (
    <div className="text-center space-y-2">
      <img
        src={image}
        alt={title}
        className="w-full h-[300px] lg:h-[345px] object-cover rounded"
      />
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      <div className="space-x-2">
        <span className="line-through text-gray-400 text-sm">${oldPrice}</span>
        <span className="text-green-500 font-semibold text-sm">${newPrice}</span>
      </div>
      <div className="flex justify-center gap-2">
        {colors.map((c, i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
