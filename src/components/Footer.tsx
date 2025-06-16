
const Footer = () => {
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
              <li><a href="#" className="text-gray-400 hover:text-gold-400 story-link">Browse Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold-400 story-link">Share Your Story</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold-400 story-link">Community Guidelines</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-gold-400 story-link">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold-400 story-link">Crisis Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold-400 story-link">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-gold-400 story-link">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold-400 story-link">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold-400 story-link">Cookie Policy</a></li>
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
