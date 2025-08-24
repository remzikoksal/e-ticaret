
export default function Section4() {
  const logos = [
    { src: "/ShopImages/icon1.png", alt: "Hooli" },
    { src: "/ShopImages/icon2.png", alt: "Lyft" },
    { src: "/ShopImages/icon3.png", alt: "Leaf" },
    { src: "/ShopImages/icon4.png", alt: "Stripe" },
    { src: "/ShopImages/icon5.png", alt: "AWS" },
    { src: "/ShopImages/icon6.png", alt: "Reddit" },
  ];

  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-2 py-20">
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