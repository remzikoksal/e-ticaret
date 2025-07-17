function EditorsPick() {
  return (
    <section className="px-4 py-10 bg-gray-50">
      {/* Başlık */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">EDITOR’S PICK</h2>
        <p className="text-sm text-gray-500">
          Problems trying to resolve <br /> the conflict between
        </p>
      </div>

      {/* Kategori Kartları */}
      <div className="flex flex-col gap-6">
        {/* 📌 Erkek görseli */}
        <div className="relative">
          <img
            src="/images/editorpick1.jpg"
            alt="Men"
            className="w-full h-auto object-cover"
          />
          <span className="absolute bottom-4 left-4 bg-white px-20 py-4 font-bold text-lg text-gray-900">
            MEN
          </span>
        </div>

        {/* 📌 Kadın görseli */}
        <div className="relative">
          <img
            src="/images/editorpick2.jpg"
            alt="Women"
            className="w-full h-auto object-cover"
          />
          <span className="absolute bottom-4 left-4 bg-white px-20 py-4 font-bold text-lg text-gray-900">
            WOMEN
          </span>
        </div>

          {/* ACCESSORIES — daha kısa yükseklik */}
        <div className="relative w-full">
          <img
            src="/images/editorpick3.jpg"
            alt="Accessories"
            className="w-full h-[180px] object-cover"
          />
          <span className="absolute bottom-3 left-4 bg-white px-6 py-2 font-bold text-lg text-gray-900">
            ACCESSORIES
          </span>
        </div>

        {/* KIDS — daha kısa yükseklik */}
        <div className="relative w-full">
          <img
            src="/images/editorpick4.jpg"
            alt="Kids"
            className="w-full h-[180px] object-cover"
          />
          <span className="absolute bottom-3 left-4 bg-white px-10 py-2 font-bold text-lg text-gray-900">
            KIDS
          </span>
        </div>
      </div>
    </section>
  );
}

export default EditorsPick;
