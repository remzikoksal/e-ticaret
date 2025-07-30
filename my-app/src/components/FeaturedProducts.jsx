import React from "react";
import img1 from "../assets/featured1.jpg";
import img2 from "../assets/featured2.jpg";
import img3 from "../assets/featured3.jpg";

const products = [
  {
    id: 1,
    image: img1,
    category: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
  {
    id: 2,
    image: img2,
    category: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
  {
    id: 3,
    image: img3,
    category: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
];

const FeaturedProducts = () => {
  return (
    <div className="py-16 px-4 text-center bg-white">
      <p className="text-sm text-blue-500 font-semibold">Practice Advice</p>
      <h2 className="text-3xl font-bold text-gray-900 mt-2">
        Featured <br className="md:hidden" /> <span className="hidden md:inline">Posts</span>
      </h2>
      <p className="text-gray-500 mt-2 max-w-xl mx-auto">
        Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm overflow-hidden text-left w-full max-w-sm md:max-w-full transition transform duration-150 ease-in-out active:scale-95 cursor-pointer min-h-[530px]"
          >
            <div className="relative">
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                NEW
              </span>
              <img
                src={item.image}
                alt="product"
                className="w-full h-[260px] md:h-[500px] object-cover"
              />
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-400 space-x-2">
                {item.category.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </p>
              <h3 className="font-semibold text-md mt-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
                <div className="flex items-center gap-1">
                  <span>🕒</span>
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📈</span>
                  <span>{item.comments} comments</span>
                </div>
              </div>

              <button className="text-blue-500 text-sm font-semibold mt-4 hover:underline flex items-center gap-1">
                Learn More <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
