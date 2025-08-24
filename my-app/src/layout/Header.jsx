
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
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Gravatar from "react-gravatar";
import { CLIENT_SET_USER } from "../store/reducers/clientReducer";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isShopOpen, setShopOpen] = useState(false);

  const user = useSelector((s) => s.client?.user);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  
  const userMenuRefDesktop = useRef(null);
  const userMenuRefMobile = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

 
  useEffect(() => {
    const handler = (e) => {
      const inDesktop =
        userMenuRefDesktop.current &&
        userMenuRefDesktop.current.contains(e.target);
      const inMobile =
        userMenuRefMobile.current &&
        userMenuRefMobile.current.contains(e.target);

      if (!inDesktop && !inMobile) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  const handleLogout = (e) => {
    e?.preventDefault?.();

   
    dispatch({ type: CLIENT_SET_USER, payload: null });

 
    localStorage.removeItem("token");

   
    setUserMenuOpen(false);
    setMobileMenuOpen(false);

    
    try {
      history.replace("/");
    } catch (_) {}
    setTimeout(() => {
      if (window.location.pathname !== "/") {
        window.location.assign("/");
      }
    }, 10);
  };

  return (
    <header>
      
      <div className="hidden md:block bg-[#2E2F41] text-white text-sm py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
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

          <p className="font-semibold text-sm">Follow Us and get a chance to win 80% off</p>

          <div className="flex items-center gap-3">
            <span>Follow Us :</span>
            <Instagram size={16} />
            <Youtube size={16} />
            <Facebook size={16} />
            <Twitter size={16} />
          </div>
        </div>
      </div>

      <div className="bg-white py-4 shadow-sm relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 relative">
       
          <h1 className="text-2xl font-bold">
            <Link to="/" className="hover:opacity-80">Bandage</Link>
          </h1>

       
          <nav className="hidden md:flex gap-4 text-gray-600 font-semibold text-sm relative">
            <Link to="/" className="hover:underline">Home</Link>

            <div className="relative">
              <div className="hover:text-black flex items-center gap-1">
                <Link to="/shop" className="hover:text-black">Shop</Link>
                <button
                  type="button"
                  onClick={() => setShopOpen((prev) => !prev)}
                  className="hover:text-black flex items-center"
                  aria-haspopup="menu"
                  aria-expanded={isShopOpen}
                  title="Shop menüsünü aç"
                >
                  <ChevronDown className="w-[20px] h-[15px] text-[#252B42]" />
                </button>
              </div>

              {isShopOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white shadow-md rounded border w-[300px] z-40 p-6">
                  <div className="grid grid-cols-2 gap-8">
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
            <Link to="/contact" className="hover:text-black">Contact</Link>
            <a href="#">Pages</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={userMenuRefDesktop}>
                <button
                  type="button"
                  className="flex items-center gap-2"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                >
                  <Gravatar
                    email={user.email}
                    size={28}
                    className="rounded-full"
                    default="mp"
                    alt={user.name || user.email}
                  />
                  <span className="text-sm font-medium text-[#252B42]">
                    {user.name || user.email}
                  </span>
                  <ChevronDown size={16} className="text-[#252B42]" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50 py-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 text-sm">
              
                <Link to="/login" className="flex items-center gap-1 text-[#23A6F0]">
                  <User size={16} />
                  <span>Login</span>
                </Link>
                <span className="text-gray-400">/</span>
                <Link to="/signup" className="text-[#23A6F0]">Register</Link>
              </div>
            )}

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

          
          <div className="flex md:hidden items-center gap-3">
            {user ? (
              <div className="relative" ref={userMenuRefMobile}>
                <button
                  type="button"
                  className="flex items-center gap-1"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                >
                  <Gravatar
                    email={user.email}
                    size={20}
                    className="rounded-full"
                    default="mp"
                    alt={user.name || user.email}
                  />
                  <ChevronDown size={16} className="text-[#252B42]" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 py-2">
                    <div className="px-4 pb-2 text-[12px] text-gray-500 truncate max-w-[9rem]">
                      {user.name || user.email}
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-[#23A6F0]">
                <User size={20} />
              </Link>
            )}

            <Search size={20} />
            <ShoppingCart size={20} />
            <Menu size={24} onClick={() => setMobileMenuOpen(true)} />
          </div>
        </div>

        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white px-4 pb-4">
            <div className="flex justify-end">
              <X size={24} onClick={() => setMobileMenuOpen(false)} />
            </div>
            <nav className="flex flex-col items-center gap-4 text-gray-600 font-semibold text-xl mt-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <a href="#" onClick={() => setMobileMenuOpen(false)}>Product</a>
              <a href="#" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
