
import { useState, useEffect } from 'react';

const quotes = [
  {
    text: "I failed my startup and felt worthless. This community showed me that failure isn't the end—it's just data.",
    author: "Mike, 34"
  },
  {
    text: "I lost someone I loved and couldn't cope. Sharing my story here helped me find hope again.",
    author: "David, 28"
  },
  {
    text: "My marriage ended and I blamed myself for everything. Here I learned that healing starts with honesty.",
    author: "James, 41"
  },
  {
    text: "I was addicted and lost my job. The men here didn't judge—they just listened and shared their own struggles.",
    author: "Carlos, 36"
  }
];

const QuotesSlider = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-6 bg-navy-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Community Voices</h2>
        
        <div className="relative h-32 overflow-hidden">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 transform ${
                index === currentQuote
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <blockquote className="text-lg md:text-xl text-gray-300 italic mb-4 leading-relaxed">
                "{quote.text}"
              </blockquote>
              <cite className="text-gold-400 font-medium">— {quote.author}</cite>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center space-x-2 mt-8">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentQuote ? 'bg-gold-400' : 'bg-gray-600'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuotesSlider;
