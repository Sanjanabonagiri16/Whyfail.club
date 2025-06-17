
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="py-12 px-6 bg-navy-900 border-t border-navy-700">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">WhyFail.club</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A safe space for men to turn breakdowns into breakthroughs.
            </p>
          </div>
          
          <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-semibold text-white mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/about')}
                  className="text-gray-400 hover:text-gold-400 transition-colors story-link"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/community-guidelines')}
                  className="text-gray-400 hover:text-gold-400 transition-colors story-link"
                >
                  Community Guidelines
                </button>
              </li>
            </ul>
          </div>
          
          <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/stories')}
                  className="text-gray-400 hover:text-gold-400 transition-colors story-link"
                >
                  Browse Stories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/journal')}
                  className="text-gray-400 hover:text-gold-400 transition-colors story-link"
                >
                  Share Your Story
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/mentalk')}
                  className="text-gray-400 hover:text-gold-400 transition-colors story-link"
                >
                  MenTalk
                </button>
              </li>
            </ul>
          </div>
          
          <div className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/help')}
                  className="text-gray-400 hover:text-gold-400 transition-colors story-link"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/crisis-resources')}
                  className="text-gray-400 hover:text-gold-400 transition-colors story-link"
                >
                  Crisis Resources
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact')}
                  className="text-gray-400 hover:text-gold-400 transition-colors story-link"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          
          <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/privacy')}
                  className="text-gray-400 hover:text-gold-400 transition-colors story-link"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/terms')}
                  className="text-gray-400 hover:text-gold-400 transition-colors story-link"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/cookies')}
                  className="text-gray-400 hover:text-gold-400 transition-colors story-link"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-navy-700 pt-8 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-gray-400 text-sm">
            © 2025 WhyFail.club. All rights reserved. • Remember: You are not your failures.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
