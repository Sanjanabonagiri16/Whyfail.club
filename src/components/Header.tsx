
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-navy-900/95 backdrop-blur-sm border-b border-navy-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-white">
          WhyFail.club
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-navy-800">
            Login
          </Button>
          <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold">
            Join Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
