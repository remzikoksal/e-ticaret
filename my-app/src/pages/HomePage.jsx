import EditorsPick from "../components/EditorsPick";
import HeroSlider from "../components/HeroSlider";
import BestSellers from "../components/BestSellers";
import FeaturedProducts from "../components/FeaturedProducts";
import VitaSlider from "../components/VitaSlider";
import NeuralPromo from "../components/NeuralPromo";



function HomePage() {
  return (
    <>
      <HeroSlider />
      <EditorsPick />
      <BestSellers />
        <VitaSlider />
        <NeuralPromo />
        <FeaturedProducts />
    </>
  );
}

export default HomePage;
