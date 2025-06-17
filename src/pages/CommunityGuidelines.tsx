
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Heart, Users, AlertTriangle } from 'lucide-react';

const CommunityGuidelines = () => {
  const guidelines = [
    {
      icon: Heart,
      title: "Respect and Kindness",
      rules: [
        "Treat all members with respect and empathy",
        "No harassment, bullying, or personal attacks",
        "Be supportive and constructive in your feedback",
        "Remember everyone is fighting their own battles"
      ]
    },
    {
      icon: Shield,
      title: "Privacy and Safety",
      rules: [
        "Respect others' privacy and anonymity choices",
        "Don't share personal information without permission",
        "Report concerning content to moderators",
        "Use trigger warnings for sensitive content"
      ]
    },
    {
      icon: Users,
      title: "Community Standards",
      rules: [
        "Stay on topic and relevant to men's mental health",
        "No spam, promotional content, or self-promotion",
        "Share authentic experiences and stories",
        "Encourage growth and positive change"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Crisis Support",
      rules: [
        "If you're in crisis, use the SOS button for immediate help",
        "Don't hesitate to reach out for professional support",
        "Report any concerning behavior immediately",
        "Remember: You are not alone in this journey"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Community Guidelines</h1>
          <p className="text-xl text-gray-300">
            Creating a safe and supportive environment for all members
          </p>
        </div>

        <div className="space-y-8">
          {guidelines.map((section, index) => (
            <Card key={index} className="bg-navy-800 border-navy-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <section.icon className="w-6 h-6 mr-3 text-gold-400" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="text-gray-300 flex items-start">
                      <span className="text-gold-400 mr-2">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-navy-800 border-navy-700 mt-8">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-4">Enforcement</h3>
            <p className="text-gray-300 mb-4">
              Violations of these guidelines may result in warnings, temporary suspensions, or permanent bans depending on severity.
            </p>
            <p className="text-gray-300">
              If you see content that violates these guidelines, please report it using the report function. 
              Our moderation team reviews all reports promptly.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default CommunityGuidelines;
