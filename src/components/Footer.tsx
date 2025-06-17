
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="py-12 px-6 bg-navy-900 border-t border-navy-700">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">WhyFail.club</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A safe space for men to turn breakdowns into breakthroughs.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/stories')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Browse Stories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/journal')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Share Your Story
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/community-guidelines')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Community Guidelines
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/help')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/crisis-resources')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Crisis Resources
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/privacy')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/terms')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/cookies')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-navy-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 WhyFail.club. All rights reserved. • Remember: You are not your failures.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
