import React from "react";
import coupleImage from "../assets/couple.png"; // → Resmi bu şekilde ekle

const NeuralPromo = () => {
  return (
    <section className="relative flex flex-col items-center text-center bg-white overflow-hidden">
      <div className="px-6 pt-10 pb-6">
        <p className="text-gray-400 font-semibold tracking-wider">SUMMER 2020</p>
        <h2 className="text-2xl font-bold text-slate-900 mt-2 leading-tight">
          Part of the <br /> Neural <br />Universe
        </h2>
        <p className="text-gray-500 mt-4 max-w-xs mx-auto text-base leading-relaxed">
          We know how large objects will act, but things on a small scale.
        </p>

        <div className="mt-6 flex flex-col gap-4 items-center">
          <button className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all duration-150 text-white font-semibold px-6 py-3 rounded">
            BUY NOW
          </button>
          <button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-100 active:scale-95 transition-all duration-150 font-semibold px-6 py-3 rounded">
            Learn More
          </button>
        </div>
      </div>

      {/* Image - Bottom */}
      <img
        src={coupleImage}
        alt="Couple"
        className="w-auto h-auto ml-8 mr-20"
      />
    </section>
  );
};

export default NeuralPromo;
