import { ChevronDown } from 'lucide-react';

import {
  Mail,
  Phone,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isShopOpen, setShopOpen] = useState(false);

  return (
    <header>
      {/* Üst Bilgi Çubuğu – SADECE MASAÜSTÜ */}
      <div className="hidden md:block bg-[#2E2F41] text-white text-sm py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Sol */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone size={16} />
              <span>(225) 555-0118</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail size={16} />
              <span>michelle.rivera@example.com</span>
            </div>
          </div>

          {/* Orta */}
          <p className="font-semibold text-sm">
            Follow Us and get a chance to win 80% off
          </p>

          {/* Sağ */}
          <div className="flex items-center gap-3">
            <span>Follow Us :</span>
            <Instagram size={16} />
            <Youtube size={16} />
            <Facebook size={16} />
            <Twitter size={16} />
          </div>
        </div>
      </div>

      {/* Navigasyon Menüsü */}
      <div className="bg-white py-4 shadow-sm relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          {/* Sol taraf (Logo) */}
          <h1 className="text-2xl font-bold">Bandage</h1>

          {/* Masaüstü Menü */}
          <nav className="hidden md:flex gap-4 text-gray-600 font-semibold text-sm relative">
            <a href="#" className="text-black">Home</a>

            <div className="relative">
              <button
                onClick={() => setShopOpen((prev) => !prev)}
                className="hover:text-black flex items-center gap-1"
              >
                Shop
                 <ChevronDown className="w-[20px] h-[15px] text-[#252B42]" />
              </button>
              {isShopOpen && (
    <div className="absolute top-full mt-2 left-0 bg-white shadow-md rounded border w-[300px] z-50 p-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Kadın Sütunu */}
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Kadın</h4>
          <ul className="space-y-2 text-gray-600 font-semibold">
            <li className="cursor-pointer hover:text-blue-500">Bags</li>
            <li className="cursor-pointer hover:text-blue-500">Belts</li>
            <li className="cursor-pointer hover:text-blue-500">Cosmetics</li>
            <li className="cursor-pointer hover:text-blue-500">Bags</li>
            <li className="cursor-pointer hover:text-blue-500">Hats</li>
          </ul>
        </div>

        {/* Erkek Sütunu */}
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Erkek</h4>
          <ul className="space-y-2 text-gray-600 font-semibold">
            <li className="cursor-pointer hover:text-blue-500">Bags</li>
            <li className="cursor-pointer hover:text-blue-500">Belts</li>
            <li className="cursor-pointer hover:text-blue-500">Cosmetics</li>
            <li className="cursor-pointer hover:text-blue-500">Bags</li>
            <li className="cursor-pointer hover:text-blue-500">Hats</li>
          </ul>
        </div>
      </div>
    </div>
  )}
</div>

            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
            <a href="#">Pages</a>
          </nav>

          {/* Sağ ikonlar */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-[#23A6F0] flex items-center gap-1 text-sm">
              <User size={16} />
              Login / Register
            </a>
            <Search size={20} className="text-gray-600" />
            <div className="flex items-center gap-1">
              <ShoppingCart size={20} className="text-gray-600" />
              <span className="text-sm">0</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={20} className="text-gray-600" />
              <span className="text-sm">0</span>
            </div>
          </div>

          {/* Mobil ikonlar */}
          <div className="flex md:hidden items-center gap-4">
            <User size={20} />
            <Search size={20} />
            <ShoppingCart size={20} />
            <Menu size={24} onClick={() => setMobileMenuOpen(true)} />
          </div>
        </div>

        {/* Mobil Menü Açılır Liste */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white px-4 pb-4">
            <div className="flex justify-end">
              <X size={24} onClick={() => setMobileMenuOpen(false)} />
            </div>
            <nav className="flex flex-col items-center gap-4 text-gray-600 font-semibold text-xl mt-4">
              <a href="#">Home</a>
              <a href="#">Product</a>
              <a href="#">Pricing</a>
              <a href="#">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
