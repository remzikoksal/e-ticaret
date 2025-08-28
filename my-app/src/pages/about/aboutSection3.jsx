
import { Facebook, Instagram, Twitter } from "lucide-react";

const DEFAULT_TEAM = [
  { name: "Username", role: "Profession", img: "/ContactImages/section3-1.jpg" },
  { name: "Username", role: "Profession", img: "/ContactImages/section3-2.jpg" },
  { name: "Username", role: "Profession", img: "/ContactImages/section3-3.jpg" },
];

export default function AboutSection3({ team = DEFAULT_TEAM }) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
      
        <header className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#252B42]">
            Meet Our Team
          </h2>
          <p className="text-[#737373] text-sm leading-relaxed max-w-2xl mx-auto">
            Problems trying to resolve the conflict between
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </header>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {team.map((m, i) => (
            <article key={i} className="w-full mb-10 max-w-[400px] text-center">
              <div className="rounded overflow-hidden bg-gray-100">
        
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full aspect-auto object-cover"
                />
              </div>

              <div className="pt-4">
                <div className="font-semibold text-[#252B42]">{m.name}</div>
                <div className="text-sm text-[#737373]">{m.role}</div>

                <div className="flex items-center justify-center gap-4 mt-3">
                  <SocialButton ariaLabel="Facebook" href="#">
                    <Facebook size={16} />
                  </SocialButton>
                  <SocialButton ariaLabel="Instagram" href="#">
                    <Instagram size={16} />
                  </SocialButton>
                  <SocialButton ariaLabel="Twitter" href="#">
                    <Twitter size={16} />
                  </SocialButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialButton({ children, href = "#", ariaLabel = "" }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="h-8 w-8 rounded-full grid place-items-center border border-[#23A6F0] text-[#23A6F0] transition hover:bg-[#23A6F0] hover:text-white"
    >
      {children}
    </a>
  );
}
