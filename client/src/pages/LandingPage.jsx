import Navbar from "../components/sub-components/Navbar";
import HeroSection from "../components/sub-components/HeroSection";
import Footer from "../components/sub-components/Footer";
import ArticleSection from "../components/sub-components/ArticleSection";

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
