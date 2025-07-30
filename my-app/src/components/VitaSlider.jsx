import React from "react";
import manImg from "/images/slider2.png";

const VitaSlider = () => {
  return (
    <div className="relative bg-[#23856D] text-white h-[900px] lg:h-[750px] flex flex-col lg:flex-row items-center justify-between overflow-hidden px-6 lg:px-24">
      
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-20 lg:mt-0 z-10 max-w-md lg:max-w-lg">
        <p className="text-sm tracking-wide">SUMMER 2020</p>
        <h2 className="text-4xl lg:text-5xl font-bold mt-2 leading-tight">
          Vita Classic <br /> Product
        </h2>
        <p className="mt-4 text-base lg:text-lg">
          We know how large objects will act, but things on a small scale.
        </p>
        <p className="mt-4 text-2xl font-bold">$16.48</p>
        <button className="mt-4 bg-green-500 hover:bg-green-600 transition px-9 py-3 rounded text-white">
          ADD TO CART
        </button>
      </div>

     
      <img
        src={manImg}
        alt="Model"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] max-w-[400px] object-contain z-0 lg:static lg:translate-y-20 lg:w-[45%] lg:max-w-[500px]"
      />

     
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl z-20">
        &lt;
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl z-20">
        &gt;
      </div>
    </div>
  );
};

export default VitaSlider;
