

function HeroSlider() {
  return (
    <section className="relative w-full h-[550px]">
      {/* 📌 Arka Plan Görseli */}
      <img
        src="/images/slider1.jpg" 
        alt="New Collection"
        className="w-full h-full object-cover"
      />

      {/* 🧾 Overlay İçerik */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-sm font-semibold tracking-wider mb-2">SUMMER 2020</p>
        <h2 className="text-3xl font-bold mb-2">NEW</h2>
        <h2 className="text-3xl font-bold mb-4">COLLECTION</h2>
        <p className="text-sm mb-6 w-[80%] max-w-xs">
          We know how large objects will act, but things on a small scale.
        </p>

        <button className="bg-green-500 text-white font-semibold py-3 px-6 rounded active:scale-95 transition-transform duration-100">
          SHOP NOW
        </button>
      </div>

      {/* 🔁 Oklar */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer select-none">
        &lt;
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer select-none">
        &gt;
      </div>
    </section>
  );
}

export default HeroSlider;
