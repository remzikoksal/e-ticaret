import { useRef, useState } from "react";

const DEFAULT_STATS = [
  { value: "15K",  label: "Happy Customers" },
  { value: "150K", label: "Monthly Visitors" },
  { value: "15",   label: "Countries  Worldwide" },
  { value: "100+", label: "Top Partners" },
];

export default function ContactSection2({
  stats = DEFAULT_STATS,
  videoSrc = "",
  posterSrc = "/ContactImages/section2.jpg",
}) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">

     
        <div className="grid md:grid-cols-2 gap-14 items-start">
         
          <div className="space-y-4 text-center md:text-left max-w-xl mx-auto md:mx-0">
            <span className="text-sm md:text-lg font-semibold tracking-wide text-[#E74040]">
              Problems trying
            </span>
            <h2 className="text-2xl md:text-3xl  font-bold leading-snug text-[#252B42]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            </h2>
          </div>

       
          <p className="text-[#737373] leading-relaxed max-w-md  text-center md:text-left mx-auto md:mx-5 mt-10">
            Problems trying to resolve the conflict between the two major realms of
            Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 place-items-center">
          {stats.map((s, i) => (
            <div key={i} className="space-y-1 text-center">
              <div className="text-5xl md:text-6xl font-bold text-[#252B42]">
                {s.value}
              </div>
              <div className="text-gray-500 text-sm font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

    
        <VideoBlock videoSrc={videoSrc} posterSrc={posterSrc} />
      </div>
    </section>
  );
}

function VideoBlock({ videoSrc, posterSrc }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (ref.current) {
      ref.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-sm max-w-[92%] md:max-w-none mx-auto">
      <div className="aspect-[16/9] bg-gray-200">
        <video
          ref={ref}
          className="w-full h-full object-cover"
          src={videoSrc}
          poster={posterSrc}
          controls={playing}
        />
      </div>

      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-[#23A6F0] grid place-items-center shadow-lg"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
}
