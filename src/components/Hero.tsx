
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative py-20 px-6 text-center bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Fail. Heal. <span className="text-gold-400">Rise.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          A safe space for men to turn breakdowns into breakthroughs.
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Share your story of failure, find your tribe, and discover the strength that comes from vulnerability.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold text-lg px-8 py-4 hover-scale"
          >
            Tell Your Story
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-gray-300 text-gray-300 hover:bg-navy-800 hover:text-white text-lg px-8 py-4 hover-scale"
          >
            Browse Stories
          </Button>
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
