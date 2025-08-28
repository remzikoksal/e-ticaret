export default function Section2({
  titleTop = "VISIT OUR OFFICE",
  title = "We help small businesses with big ideas",
  items = [
    {
      id: "left",
      icon: <img src="/ContactImages/icon1.png" alt="Icon 1" className="h-16 w-16 text-[#23A6F0]" />,
      emails: ["georgia.young@example.com", "georgia.young@ple.com"],
      cta: "Submit Request",
      label: "Get Support",
      variant: "light", 
    },
    {
      id: "center",
      icon:<img src="/ContactImages/icon2.png" alt="Icon 2" className="h-16 w-16 text-[#23A6F0]" />,
      emails: ["georgia.young@example.com", "georgia.young@ple.com"],
      cta: "Submit Request",
      label: "Get Support",
      variant: "dark",
    },
    {
      id: "right",
      icon: <img src="/ContactImages/icon3.png" alt="Icon 3" className="h-16 w-16 text-[#23A6F0]" />,
      emails: ["georgia.young@example.com", "georgia.young@ple.com"],
      cta: "Submit Request",
      label: "Get Support",
      variant: "light",
    },
  ],
}) {
  return (
    <section className="bg-[#FAFAFA]">
     
      <div className="mx-auto max-w-3xl px-4 pt-16 text-center">
        <p className="text-sm font-semibold tracking-[0.4em] text-black">
          {titleTop}
        </p>
        <h2 className="mt-7 text-2xl font-semibold text-black sm:text-5xl">
          {title}
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 md:grid-cols-3">
        {items.map((it, idx) => {
          const isDark = it.variant === "dark";

          return (
            <article
              key={it.id || idx}
              className={[
                "relative flex flex-col items-center justify-between text-center",
                "px-10 py-12",                 
                "min-h-[420px]",               
                isDark
                  ? "bg-[#252B42] text-white rounded-none"      
                  : "bg-white text-[#252B42]",                  
              ].join(" ")}
            >
           
              <div className="mb-3 flex items-center justify-center">
                {it.icon}
              </div>

             
              <div className={["space-y-2 text-lg font-bold", isDark ? "text-white/90" : "text-gray-700"].join(" ")}>
                {it.emails?.map((e, i) => (
                  <p key={i}>{e}</p>
                ))}
              </div>

          
              <p className={["mt-6 text-lg font-bold", isDark ? "text-white" : "text-[#252B42]"].join(" ")}>
                {it.label}
              </p>

         
              <button
                type="button"
                className={[
                  "mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition",
                  isDark
                    ? "bg-[#23A6F0] text-white hover:opacity-90"
                    : "border border-[#23A6F0] text-[#23A6F0] hover:bg-[#23A6F0]/5",
                ].join(" ")}
              >
                {it.cta}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
