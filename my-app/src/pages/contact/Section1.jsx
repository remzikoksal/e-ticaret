import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Section1({ imageSrc = "/ContactImages/contact1.png" }) {
  return (
    <section className="relative bg-white overflow-visible">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="order-1 md:order-1 text-center md:text-left">
            <p className="mb-3 md:mb-4 text-xs md:text-base font-semibold tracking-widest text-[#252B42]">
              CONTACT US
            </p>

            <h1
              className="
                mb-4
                text-5xl md:text-6xl
                font-semibold
                leading-snug md:leading-tight
                text-[#252B42]
              "
            >
              Get in touch
              <br className="hidden sm:block" /> today!
            </h1>

            <p className="mb-6 max-w-[20rem] md:max-w-md text-gray-500 mx-auto md:mx-0">
              We know how large objects will act, but things on a small scale
            </p>

            <div className="mb-4 space-y-2 text-[#252B42] mx-auto md:mx-0 w-max md:w-auto">
              <p className="text-base md:text-lg font-semibold">
                Phone : <span className="font-bold">+451 215 215</span>
              </p>
              <p className="text-base md:text-lg font-semibold">
                Fax : <span className="font-bold">+451 215 215</span>
              </p>
            </div>

         
         <div className="relative mt-6">


  <div className="relative z-10 inline-flex items-center justify-center gap-6 bg-white px-4">
    <a href="#" aria-label="Twitter" className="transition-opacity hover:opacity-70">
      <Twitter className="h-6 w-6 text-[#252B42]" />
    </a>
    <a href="#" aria-label="Facebook" className="transition-opacity hover:opacity-70">
      <Facebook className="h-6 w-6 text-[#252B42]" />
    </a>
    <a href="#" aria-label="Instagram" className="transition-opacity hover:opacity-70">
      <Instagram className="h-6 w-6 text-[#252B42]" />
    </a>
    <a href="#" aria-label="LinkedIn" className="transition-opacity hover:opacity-70">
      <Linkedin className="h-6 w-6 text-[#252B42]" />
    </a>
  </div>
</div>
          </div>
          <div className="order-2 md:order-2 relative md:justify-self-end w-full overflow-visible">
            <div
              className="
                relative isolate
                mx-auto md:ml-auto
                w-[min(84vw,340px)] sm:w-[min(84vw,400px)]   /* mobilde dar ve ortalı */
                md:w-[min(53vw,1100px)]                      /* desktopta mevcut genişlik */
                overflow-visible mt-8                         /* metinden sonra boşluk */
              "
            >
              <div
                aria-hidden
                className="
                  absolute z-0
                  left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 h-[230px] w-[230px]
                  sm:h-[280px] sm:w-[280px]
                  md:left-auto md:right-[33%] md:top-[6%] md:translate-x-0 md:translate-y-0 md:h-[450px] md:w-[450px]
                  rounded-full bg-[#FDE8EF]
                "
              />
      
              <div
                aria-hidden
                className="
                  absolute z-0
                  left-[22%] top-[18%] h-10 w-10
                  sm:h-12 sm:w-12
                  md:left-auto md:right-[73%] md:top-[6%] md:h-16 md:w-16
                  rounded-full bg-[#FFD6E7] opacity-80
                "
              />
            
              <img
                src={imageSrc}
                alt="Happy customers with shopping bags"
                loading="lazy"
                className="relative z-10 block w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
