import { Link } from "react-router-dom";

export default function SectionOne() {
  const tiles = [
    { src: "ShopImages/card1.png" },
    { src: "ShopImages/card2.png" },
    { src: "ShopImages/card3.png" },
    { src: "ShopImages/card4.png" },
    { src: "ShopImages/card5.png" },
  ];

  return (
    <section className="bg-[#FAFAFA]">
   
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <div className="flex flex-col items-center text-center gap-2
                        md:flex-row md:items-center md:justify-between md:text-left md:gap-0">
          <h1 className="text-xl md:text-1xl font-bold text-gray-900">Shop</h1>
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700 font-bold">Shop</span>
          </nav>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tiles.map((t, i) => (
           <div
  key={i}
  className="w-4/5 md:w-full mx-auto relative rounded-md overflow-hidden bg-gray-200 aspect-square
             shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg"
>

              {t.src ? (
                <img
                  src={t.src}
                  alt={`Tile ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
