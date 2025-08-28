
export default function AboutSection5({
  imgSrc = "/ContactImages/section5.jpg", 
}) {
  return (
    <section className="bg-white">
     
      <div className="grid gap-0 md:grid-cols-2 lg:[grid-template-columns:60%_40%]">

      
        <div className="relative order-first md:order-last h-64 sm:h-70 md:h-auto md:min-h-[1050px]">
          <img
            src={imgSrc}
            alt="Work with us"
            className="absolute inset-0 w-full   h-full object-cover"
          />
        </div>

        <div className="bg-[#2A7CC7] text-white px-6 sm:px-10 lg:px-24 py-14 md:py-24 flex items-center">
          <div className="max-w-xl space-y-6">
            <span className="uppercase tracking-widest font-extrabold text-white/90">
              Work With Us
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Now Let’s grow Yours
            </h2>

            <p className="text-white/90 leading-relaxed max-w-[46ch]">
              The gradual accumulation of information about atomic and
              small-scale behavior during the first quarter of the 20th
            </p>

            <button
              type="button"
              className="inline-flex h-12 px-8 items-center justify-center rounded border-2 border-white text-white font-semibold hover:bg-white hover:text-[#2A7CC7] transition"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
