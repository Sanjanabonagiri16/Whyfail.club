
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuotesSlider from "@/components/QuotesSlider";
import HowItWorks from "@/components/HowItWorks";
import WhyJoin from "@/components/WhyJoin";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-navy-900">
      <Header />
      <Hero />
      <QuotesSlider />
      <HowItWorks />
      <WhyJoin />
      <Footer />
    </div>
  );
};

export default Index;
