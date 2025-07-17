import {
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

function Footer() {
  return (
    <footer className="text-sm text-gray-600">

    {/* ÜST ALAN - Logo + Sosyal */}
<div className="bg-[#FAFAFA] py-6 px-4">
  <h2 className="text-2xl font-bold text-[#252B42] mb-4">Bandage</h2>
  <div className="flex space-x-4">
    <Facebook className="text-blue-500" />
    <Instagram className="text-blue-500" />
    <Twitter className="text-blue-500" />
  </div>
</div>

      {/* ORTA ALAN - Link Grupları */}
      <div className="bg-white px-6 py-10 grid grid-cols-1 gap-8">

        {/* Grup: Company Info */}
        <div>
          <h3 className="text-[#252B42] font-bold mb-3">Company Info</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Grup: Legal */}
        <div>
          <h3 className="text-[#252B42] font-bold mb-3">Legal</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Grup: Features */}
        <div>
          <h3 className="text-[#252B42] font-bold mb-3">Features</h3>
          <ul className="space-y-1">
            <li>Business Marketing</li>
            <li>User Analytic</li>
            <li>Live Chat</li>
            <li>Unlimited Support</li>
          </ul>
        </div>

        {/* Grup: Resources */}
        <div>
          <h3 className="text-[#252B42] font-bold mb-3">Resources</h3>
          <ul className="space-y-1">
            <li>IOS & Android</li>
            <li>Watch a Demo</li>
            <li>Customers</li>
            <li>API</li>
          </ul>
        </div>

        {/* Grup: Get In Touch */}
        <div>
          <h3 className="text-[#252B42] font-bold mb-3">Get In Touch</h3>
          <div className="flex border rounded overflow-hidden w-full max-w-md">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-4 py-4 outline-none"
            />
            <button
  className="bg-blue-500 text-white px-6 py-4 text-sm font-semibold
             active:scale-95 transition-transform duration-100"
>
  Subscribe
</button>

          </div>
          <p className="mt-2text-gray-500">Lore imp sum dolor Amit</p>
        </div>

      </div>

      {/* ALT ALAN - Telif Yazısı */}
      <div className="bg-[#FAFAFA] text-center py-6 px-4 text-gray-600">
        <p className="font-bold">Made With Love By</p>
        <p className="font-bold">Finland All Right Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
