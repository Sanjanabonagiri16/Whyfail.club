
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative py-20 px-6 text-center bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-navy-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="inline-block animate-fade-in">Fail.</span>{" "}
          <span className="inline-block animate-fade-in" style={{ animationDelay: '0.3s' }}>Heal.</span>{" "}
          <span className="inline-block text-gold-400 animate-fade-in bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent" style={{ animationDelay: '0.6s' }}>
            Rise.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in" style={{ animationDelay: '0.9s' }}>
          A safe space for men to turn breakdowns into breakthroughs.
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-slide-in" style={{ animationDelay: '1.2s' }}>
          Share your story of failure, find your tribe, and discover the strength that comes from vulnerability.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in" style={{ animationDelay: '1.5s' }}>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => navigate(user ? '/journal' : '/auth')}
          >
            Tell Your Story
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-navy-900 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => navigate('/stories')}
          >
            Browse Stories
          </Button>
        </div>

        {/* Call to action section */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '1.8s' }}>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="group cursor-pointer" onClick={() => navigate('/about')}>
              <div className="bg-navy-800/50 backdrop-blur-sm border border-navy-700 rounded-lg p-6 transform group-hover:scale-105 transition-all duration-300">
                <div className="text-2xl mb-2">🤝</div>
                <h3 className="text-lg font-semibold text-white mb-2">Our Community</h3>
                <p className="text-gray-400 text-sm">Join thousands of men sharing their journeys</p>
              </div>
            </div>
            <div className="group cursor-pointer" onClick={() => navigate(user ? '/journal' : '/auth')}>
              <div className="bg-navy-800/50 backdrop-blur-sm border border-navy-700 rounded-lg p-6 transform group-hover:scale-105 transition-all duration-300">
                <div className="text-2xl mb-2">✍️</div>
                <h3 className="text-lg font-semibold text-white mb-2">Start Writing</h3>
                <p className="text-gray-400 text-sm">Express yourself in a judgment-free space</p>
              </div>
            </div>
            <div className="group cursor-pointer" onClick={() => navigate('/crisis-resources')}>
              <div className="bg-navy-800/50 backdrop-blur-sm border border-navy-700 rounded-lg p-6 transform group-hover:scale-105 transition-all duration-300">
                <div className="text-2xl mb-2">🆘</div>
                <h3 className="text-lg font-semibold text-white mb-2">Get Support</h3>
                <p className="text-gray-400 text-sm">Access crisis resources and professional help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
