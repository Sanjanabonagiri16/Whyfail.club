
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Share Your Story",
    description: "Write about your failure, setback, or struggle. Anonymous or with your name—your choice.",
    icon: "✍️"
  },
  {
    number: "02",
    title: "Find Your Tribe",
    description: "Connect with men who've walked similar paths. No judgment, just understanding.",
    icon: "🤝"
  },
  {
    number: "03",
    title: "Grow Together",
    description: "Learn from others' journeys. Turn your pain into wisdom, your failure into strength.",
    icon: "🌱"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 bg-navy-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Three simple steps to transform your struggles into strength
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-navy-800 border-navy-700 hover:bg-navy-700 transition-colors duration-300 hover-scale">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-gold-400 font-bold text-lg mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
