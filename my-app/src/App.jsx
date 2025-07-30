import { Home } from "lucide-react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
     <HomePage />
      <Footer />
    </div>
  );
}

export default App;
