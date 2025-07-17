import { User, Search, ShoppingCart, Menu } from "lucide-react";

function Header() {
  return (
    <header className="bg-white shadow px-4 py-4">
      {/* Üst Satır */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#252B42]">Bandage</h1>
        <div className="flex items-center space-x-4">
          <User className="text-[#252B42] w-5 h-5" />
          <Search className="text-[#252B42] w-5 h-5" />
          <ShoppingCart className="text-[#252B42] w-5 h-5" />
          <Menu className="text-[#252B42] w-5 h-5" />
        </div>
      </div>

      {/* Menü Linkleri */}
      <nav className="mt-8 flex flex-col items-center space-y-4">
        <a href="#" className="text-gray-500 text-lg">Home</a>
        <a href="#" className="text-gray-1000 text-lg">Product</a>
        <a href="#" className="text-gray-1000 text-lg">Pricing</a>
        <a href="#" className="text-gray-1000 text-lg">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
