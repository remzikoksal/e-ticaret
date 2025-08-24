
export default function ContactSection1({ imgSrc = "/ContactImages/section1.png" }) {
  return (
    <section className="bg-white"> 
      <div className="max-w-7xl mx-auto px-4  py-16 grid md:grid-cols-2 gap-10 items-center">

        <div className="space-y-6 md:space-y-7 text-center md:text-left max-w-md md:max-w-none mx-auto md:mx-0">
          <span className="hidden md:inline-block text-xs font-bold tracking-widest uppercase text-gray-500">
            ABOUT COMPANY
          </span>

          <h1 className="text-4xl md:text-5xl leading-[1.15] font-bold text-[#252B42]">
            ABOUT US
          </h1>

          <p className="text-[#737373] max-w-sm md:max-w-md leading-7 mx-auto md:mx-0">
            We know how large objects will act, but things on a small scale.
          </p>

          <button className="mx-auto  md:mx-0 inline-flex items-center justify-center rounded-lg bg-[#23A6F0] text-white px-6 py-3 font-semibold active:scale-95">
            Get Quote Now
          </button>
        </div>
        <div className="relative isolate md:order-last mt-40 min-h-[300px] md:min-h-[460px]">
          
          <span
            aria-hidden="true"
            className="absolute left-1/4 top-1/4 -translate-x-1/4 -translate-y-1/2 w-[310px] h-[310px] md:w-[400px] md:h-[400px] rounded-full z-0"
            style={{ backgroundColor: "#FBE4EA" }}
          />
          <span
            aria-hidden="true"
            className="absolute -top-20 md:  w-14 h-14 rounded-full z-0"
            style={{ backgroundColor: "#FBE4EA" }}
          />
          <img
            src={imgSrc}
            alt="Happy shopper"
            className="relative z-10 mx-auto max-h-[504px] object-contain scale-[1.8] md:scale-[1.4]"
          />
        </div>
      </div>
    </section>
  );
}
