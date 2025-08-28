export default function AboutSection4() {
  const logos = [
    { src: "ShopImages/icon1.png", alt: "Hooli" },
    { src: "ShopImages/icon2.png", alt: "Lyft" },
    { src: "ShopImages/icon3.png", alt: "Leaf" },
    { src: "ShopImages/icon4.png", alt: "Stripe" },
    { src: "ShopImages/icon5.png", alt: "AWS" },
    { src: "ShopImages/icon6.png", alt: "Reddit" },
  ];

  return (
    <section className="bg-[#FAFAFA]">
      
      <div className="max-w-7xl mx-auto px-2 py-10 mb-20 mt-10">
        <h2 className="text-2xl mt-4 text-[#252B42] md:text-4xl font-bold text-center mb-8">
          Big Companies Are Here
        </h2>
        <p className="text-[#737373] text-center max-w-2xl mx-auto mb-12">
Problems trying to resolve the conflict between
the two major realms of Classical physics: Newtonian mechanics
        </p>
        <div className="rounded-md">
          <div className="py-8 md:py-10">
           
            <div className="grid grid-cols-1 md:grid-cols-6 gap-y-8 md:gap-y-0 gap-x-10 place-items-center">
              {logos.map((l, i) => (
                <div
                  key={i}
                  className="h-10 md:h-20 w-28 md:w-32 flex items-center justify-center"
                >
                  {l.src ? (
                    <img
                      src={l.src}
                      alt={l.alt}
                      className="max-h-full w-auto object-contain grayscale opacity-70"
                    />
                  ) : (
                   
                    <div className="h-full w-full bg-gray-200 rounded" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
