
import ContactSection1 from "./contact/contactSection1";
import ContactSection2 from "./contact/contactSection2";
import ContactSection3 from "./contact/contactSection3";
import ContactSection4 from "./contact/contactSection4";
import ContactSection5 from "./contact/contactSection5";


export default function Contact() {
  return (
    <div className="flex flex-col">
      <ContactSection1/>
      <ContactSection2 />
      <ContactSection3 />
      <ContactSection4 />
      <ContactSection5 />
     
    </div>
  );
}

