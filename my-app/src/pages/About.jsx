
import AboutSection1 from "./about/aboutSection1";
import AboutSection2 from "./about/aboutSection2";
import AboutSection3 from "./about/aboutSection3";
import AboutSection4 from "./about/aboutSection4";
import AboutSection5 from "./about/aboutSection5";


export default function About() {
  return (
    <div className="flex flex-col">
      <AboutSection1/>
      <AboutSection2 />
      <AboutSection3 />
      <AboutSection4 />
      <AboutSection5 />
     
    </div>
  );
}

