
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Book, Phone, Users, Settings, Shield } from 'lucide-react';

const Help = () => {
  const helpSections = [
    {
      icon: MessageCircle,
      title: "Getting Started",
      items: [
        "How to create your first journal entry",
        "Understanding anonymous mode",
        "Navigating the community features",
        "Setting up your profile"
      ]
    },
    {
      icon: Book,
      title: "Journal Features",
      items: [
        "Writing effective journal entries",
        "Using mood tracking",
        "Creating bounce-back plans",
        "Managing public vs private entries"
      ]
    },
    {
      icon: Users,
      title: "Community Interaction",
      items: [
        "Joining MenTalk circles",
        "Reading and commenting on stories",
        "Following other members",
        "Sharing your experiences safely"
      ]
    },
    {
      icon: Shield,
      title: "Safety & Privacy",
      items: [
        "Reporting inappropriate content",
        "Understanding our moderation",
        "Privacy settings and controls",
        "Crisis support resources"
      ]
    },
    {
      icon: Settings,
      title: "Account Management",
      items: [
        "Updating your profile",
        "Changing notification preferences",
        "Downloading your data",
        "Deleting your account"
      ]
    },
    {
      icon: Phone,
      title: "Crisis Support",
      items: [
        "When to use the SOS button",
        "Emergency contact numbers",
        "Professional help resources",
        "Peer support options"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-xl text-gray-300">
            Find answers and get support for using WhyFail.club
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpSections.map((section, index) => (
            <Card key={index} className="bg-navy-800 border-navy-700 hover:bg-navy-750 transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <section.icon className="w-5 h-5 mr-3 text-gold-400" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-300 text-sm hover:text-gold-400 cursor-pointer transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-navy-800 border-navy-700 mt-12">
          <CardHeader>
            <CardTitle className="text-white">Still Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:support@whyfail.club" className="text-gold-400 hover:text-gold-300">
                Email Support
              </a>
              <span className="text-gray-500 hidden sm:block">|</span>
              <span className="text-gray-300">Response time: 24-48 hours</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
