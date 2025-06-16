
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    title: "Safe Space",
    description: "No judgment, no toxic masculinity. Just real men sharing real struggles.",
    icon: "🛡️"
  },
  {
    title: "Anonymous Option",
    description: "Share as much or as little as you want. Your privacy is protected.",
    icon: "🎭"
  },
  {
    title: "Peer Support",
    description: "Get advice from men who've been there. Real experience, real solutions.",
    icon: "💪"
  },
  {
    title: "Growth Mindset",
    description: "Transform failures into learning experiences. Turn pain into purpose.",
    icon: "📈"
  }
];

const WhyJoin = () => {
  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Join WhyFail.club?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Because vulnerability is strength, and every failure is a setup for a comeback
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-navy-800 border-navy-700 hover:bg-navy-700 transition-all duration-300 hover-scale">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
