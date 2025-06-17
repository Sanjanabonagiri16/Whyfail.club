
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Users, Target, Award, Lightbulb } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Shield,
      title: "Safe Space",
      description: "We provide a judgment-free environment where vulnerability is seen as strength, not weakness."
    },
    {
      icon: Heart,
      title: "Authentic Connection",
      description: "Real men sharing real struggles, creating genuine bonds through shared experiences."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "No one faces their challenges alone. Our community stands together through thick and thin."
    },
    {
      icon: Target,
      title: "Growth Focused",
      description: "Every failure is a learning opportunity. We transform setbacks into comebacks."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Stories Shared" },
    { number: "5,000+", label: "Active Members" },
    { number: "98%", label: "Feel Supported" },
    { number: "24/7", label: "Community Access" }
  ];

  const team = [
    {
      name: "The Community",
      role: "Real Men, Real Stories",
      description: "Our strength comes from every member who chooses vulnerability over isolation."
    }
  ];

  return (
    <div className="min-h-screen bg-navy-900">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            About <span className="text-gold-400">WhyFail.club</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-slide-in" style={{ animationDelay: '0.3s' }}>
            Where men transform their darkest moments into their greatest strengths
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-navy-800 border-navy-700 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  To create a world where men feel empowered to share their struggles, learn from failure, 
                  and support each other through life's toughest challenges. We believe that vulnerability 
                  is not weakness—it's the birthplace of courage, creativity, and change.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gold-400 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2" />
                    Why We Exist
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Too many men suffer in silence, believing they must face their struggles alone. 
                    Society teaches us to hide our pain, but we know that healing happens in community. 
                    WhyFail.club breaks the cycle of isolation by providing a platform where failure 
                    becomes fuel for growth.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gold-400 flex items-center">
                    <Award className="w-6 h-6 mr-2" />
                    Our Impact
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Every story shared on our platform creates ripples of hope. Members report 
                    feeling less alone, more understood, and better equipped to handle life's 
                    challenges. By normalizing the conversation around failure and mental health, 
                    we're changing lives one story at a time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">Our Values</h2>
            <p className="text-xl text-gray-300 animate-slide-in" style={{ animationDelay: '0.3s' }}>
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-navy-800 border-navy-700 hover:bg-navy-700 transition-all duration-300 transform hover:scale-105 animate-slide-in" style={{ animationDelay: `${0.6 + index * 0.2}s` }}>
                <CardHeader className="text-center">
                  <value.icon className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                  <CardTitle className="text-white">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">Our Community in Numbers</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-navy-800 border-navy-700 text-center animate-scale-in" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-gold-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-navy-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
            Ready to Turn Your Failure into Fuel?
          </h2>
          <p className="text-xl text-gray-300 mb-8 animate-slide-in" style={{ animationDelay: '0.3s' }}>
            Join thousands of men who've discovered that their greatest failures became their greatest teachers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/auth')}
            >
              Join Our Community
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-navy-900 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/stories')}
            >
              Read Success Stories
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
