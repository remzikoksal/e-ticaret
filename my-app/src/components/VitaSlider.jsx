
import React from "react";
 import manImg from "/images/slider2.png"; // Görseli sen ekle

const VitaSlider = () => {
  return (
<div className="relative bg-green-700 text-white h-[900px] flex flex-col justify-between">
  {/* İçerik */}
  <div className="flex flex-col items-center mt-20 px-4 text-center z-10">
    <p className="text-sm tracking-wide">SUMMER 2020</p>
    <h2 className="text-3xl font-bold mt-2">Vita Classic <br /> Product</h2>
    <p className="mt-4 max-w-xs">
      We know how large objects will act, but things on a small scale.
    </p>
    <p className="mt-4 text-2xl font-bold">$16.48</p>
    <button className="mt-4 bg-green-500 hover:bg-green-600 transition  px-9 py-3 rounded text-white">
      ADD TO CART
    </button>
  </div>

  {/* Oklar */}
  <div className="absolute left-4 top-1/3 transform -translate-y-1/2 text-3xl">
    &lt;
  </div>
  <div className="absolute right-4 top-1/3 transform -translate-y-1/2 text-3xl">
    &gt;
  </div>

  {/* Model görseli */}
  <img
    src={manImg}
    alt="Model"
    className="absolute bottom-0 left-0 w-[80%] max-w-[500px] object-containe z-0"
  />
</div>

  );
};

export default VitaSlider;

