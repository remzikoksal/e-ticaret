import ProductCard from "./ProductCard";
import img1 from "../assets/seller1.jpg";
import img2 from "../assets/seller2.jpg";
import img3 from "../assets/seller3.jpg";
import img4 from "../assets/seller4.jpg";
import img5 from "../assets/seller5.jpg";
import img6 from "../assets/seller6.jpg";
import img7 from "../assets/seller7.jpg";
import img8 from "../assets/seller8.jpg";

const products = [
  { image: img1, title: "Graphic Design", subtitle: "English Department", oldPrice: "16.48", newPrice: "6.48", colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"] },
  { image: img2, title: "Graphic Design", subtitle: "English Department", oldPrice: "16.48", newPrice: "6.48", colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"] },
  { image: img3, title: "Graphic Design", subtitle: "English Department", oldPrice: "16.48", newPrice: "6.48", colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"] },
  { image: img4, title: "Graphic Design", subtitle: "English Department", oldPrice: "16.48", newPrice: "6.48", colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"] },
  { image: img5, title: "Graphic Design", subtitle: "English Department", oldPrice: "16.48", newPrice: "6.48", colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"] },
  { image: img6, title: "Graphic Design", subtitle: "English Department", oldPrice: "16.48", newPrice: "6.48", colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"] },
  { image: img7, title: "Graphic Design", subtitle: "English Department", oldPrice: "16.48", newPrice: "6.48", colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"] },
  { image: img8, title: "Graphic Design", subtitle: "English Department", oldPrice: "16.48", newPrice: "6.48", colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"] },
];

const BestSellers = () => {
  return (
    <section className="px-4 py-10">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">Featured Products</p>
        <h2 className="text-xl font-bold text-gray-800">BESTSELLER PRODUCTS</h2>
        <p className="text-xs text-gray-500 mt-1">Problems trying to resolve the conflict between</p>
      </div>

      
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 max-w-[1280px] mx-auto">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
