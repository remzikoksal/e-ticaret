import React from "react";

const EditorsPick = () => {
  return (
    <section className="px-4 py-10 bg-gray-50">
      {/* Başlık */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">EDITOR’S PICK</h2>
        <p className="text-sm text-gray-500">
          Problems trying to resolve <br className="hidden lg:block" /> the conflict between
        </p>
      </div>

      
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-center lg:items-stretch max-w-[1280px] mx-auto">
        
        {/* MEN */}
        <div className="relative w-full h-[500px] lg:w-[42%] lg:h-[700px]">
          <img
            src="/images/editorpick1.jpg"
            alt="Men"
            className="w-full h-full object-cover rounded"
          />
          <span className="absolute bottom-4 left-4 bg-white px-6 py-2 font-bold text-base text-gray-900 shadow">
            MEN
          </span>
        </div>

     
        <div className="flex flex-col gap-4 w-full lg:flex-row lg:w-[58%]">
          
          {/* WOMEN */}
          <div className="relative w-full h-[500px] lg:h-[700px] lg:w-[65%]">
            <img
              src="/images/editorpick2.jpg"
              alt="Women"
              className="w-full h-full object-cover rounded"
            />
            <span className="absolute bottom-4 left-4 bg-white px-6 py-2 font-bold text-base text-gray-900 shadow">
              WOMEN
            </span>
          </div>

          {/* ACCESSORIES + KIDS */}
          <div className="flex flex-col gap-4 w-full lg:w-[35%]">
            {/* Accessories */}
            <div className="relative w-full h-[240px] lg:h-[345px]">
              <img
                src="/images/editorpick3.jpg"
                alt="Accessories"
                className="w-full h-full object-cover rounded"
              />
              <span className="absolute bottom-3 left-4 bg-white px-4 py-1 font-bold text-sm text-gray-900 shadow">
                ACCESSORIES
              </span>
            </div>

            {/* Kids */}
            <div className="relative w-full h-[240px] lg:h-[345px]">
              <img
                src="/images/editorpick4.jpg"
                alt="Kids"
                className="w-full h-full object-cover rounded"
              />
              <span className="absolute bottom-3 left-4 bg-white px-4 py-1 font-bold text-sm text-gray-900 shadow">
                KIDS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
