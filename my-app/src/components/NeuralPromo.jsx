import React from "react";
import coupleImage from "../assets/couple.png";

const NeuralPromo = () => {
  return (
    <section className="w-full">
      
      <div className="block lg:hidden text-center px-6 py-10">
        <p className="text-gray-400 font-semibold text-sm mb-2">SUMMER 2020</p>
        <h2 className="text-3xl font-bold text-slate-900 leading-snug mb-4">
          Part of the <br /> Neural <br /> Universe
        </h2>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          We know how large objects will act, but things on a small scale.
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 font-semibold rounded mb-4 transform transition-transform duration-150 active:scale-95">
          BUY NOW
        </button>
        <br />
        <button className="border border-blue-500 text-blue-500 px-6 py-3 font-semibold rounded transform transition-transform duration-150 active:scale-95">
          Learn More
        </button>
        <div className="mt-10">
          <img
            src={coupleImage}
            alt="Couple"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      
      <div className="hidden lg:flex items-center justify-between px-20 py-16">
        <div className="w-1/2">
          <img
            src={coupleImage}
            alt="Couple"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-1/2 pl-10">
          <p className="text-gray-400 font-semibold text-sm mb-2">SUMMER 2020</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Part of the Neural Universe
          </h2>
          <p className="text-gray-500 mb-8 max-w-md">
            We know how large objects will act, but things on a small scale.
          </p>
          <div className="flex gap-4">
            <button className="bg-green-500 text-white px-6 py-3 font-semibold rounded transform transition-transform duration-150 active:scale-95">
              BUY NOW
            </button>
            <button className="border-2 border-green-500 text-green-500 px-6 py-3 font-semibold rounded hover:bg-green-100 transform transition-transform duration-150 active:scale-95">
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeuralPromo;
