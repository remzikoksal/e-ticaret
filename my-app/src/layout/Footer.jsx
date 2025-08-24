import {
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

function Footer() {
  return (
    <footer className="text-sm text-gray-600">


      <div className="bg-white py-6 px-4 flex flex-col md:flex-row justify-between items-center md:px-20">
        <h2 className="text-2xl font-bold text-[#252B42] mb-4 mt-3 md:mb-0">Bandage</h2>
        <div className="flex space-x-4">
          <Facebook className="text-blue-500" />
          <Instagram className="text-blue-500" />
          <Twitter className="text-blue-500" />
        </div>
      </div>

     
      <div className="bg-white px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-8 md:px-20">

       
        <div>
          <h3 className="text-[#252B42] font-bold mb-3">Company Info</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#252B42] font-bold mb-3">Legal</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-[#252B42] font-bold mb-3">Features</h3>
          <ul className="space-y-1">
            <li>Business Marketing</li>
            <li>User Analytic</li>
            <li>Live Chat</li>
            <li>Unlimited Support</li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-[#252B42] font-bold mb-3">Resources</h3>
          <ul className="space-y-1">
            <li>IOS & Android</li>
            <li>Watch a Demo</li>
            <li>Customers</li>
            <li>API</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#252B42] font-bold mb-3">Get In Touch</h3>
          <div className="flex border rounded overflow-hidden w-full max-w-md">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-4 py-4 outline-none"
            />
            <button
              className="bg-blue-500 text-white px-6 py-4 text-sm font-semibold active:scale-95 transition-transform duration-100"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-2 text-gray-500">Lore imp sum dolor Amit</p>
        </div>
      </div>

    
      <div className="bg-[#FAFAFA] text-center py-6 px-4 text-gray-600">
        <p className="font-bold">Made With Love By</p>
        <p className="font-bold">Finland All Right Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
