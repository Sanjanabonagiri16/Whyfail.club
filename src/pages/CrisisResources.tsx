
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageCircle, Globe, Clock, Heart, AlertTriangle } from 'lucide-react';
import SOSButton from '@/components/SOSButton';

const CrisisResources = () => {
  const emergencyContacts = [
    {
      name: "Suicide & Crisis Lifeline",
      number: "988",
      description: "24/7 free and confidential support for people in distress",
      type: "call"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 crisis support via text message",
      type: "text"
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "For immediate life-threatening emergencies",
      type: "emergency"
    }
  ];

  const onlineResources = [
    {
      name: "National Alliance on Mental Illness (NAMI)",
      url: "https://nami.org",
      description: "Mental health education, support, and advocacy"
    },
    {
      name: "Mental Health America",
      url: "https://mhanational.org",
      description: "Mental health screening tools and resources"
    },
    {
      name: "Crisis Chat",
      url: "https://suicidepreventionlifeline.org/chat",
      description: "Online chat with trained crisis counselors"
    }
  ];

  const warningSigns = [
    "Talking about wanting to die or hurt yourself",
    "Looking for ways to kill yourself",
    "Talking about feeling hopeless or having no purpose",
    "Talking about feeling trapped or in unbearable pain",
    "Talking about being a burden to others",
    "Increasing use of alcohol or drugs",
    "Acting anxious, agitated, or reckless",
    "Sleeping too little or too much",
    "Withdrawing or feeling isolated",
    "Showing rage or talking about seeking revenge",
    "Displaying extreme mood swings"
  ];

  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Crisis Resources</h1>
          <p className="text-xl text-gray-300 mb-6">
            Immediate help and support when you need it most
          </p>
          <div className="flex justify-center">
            <SOSButton className="text-lg px-6 py-3" />
          </div>
        </div>

        {/* Emergency Contacts */}
        <Card className="bg-red-900/20 border-red-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-navy-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    {contact.type === 'call' && <Phone className="w-5 h-5 text-red-400 mr-2" />}
                    {contact.type === 'text' && <MessageCircle className="w-5 h-5 text-red-400 mr-2" />}
                    {contact.type === 'emergency' && <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />}
                    <h3 className="text-white font-semibold">{contact.name}</h3>
                  </div>
                  <p className="text-gold-400 font-mono text-lg mb-2">{contact.number}</p>
                  <p className="text-gray-300 text-sm">{contact.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Online Resources */}
        <Card className="bg-navy-800 border-navy-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-6 h-6 mr-3 text-gold-400" />
              Online Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {onlineResources.map((resource, index) => (
                <div key={index} className="border-b border-navy-600 last:border-b-0 pb-4 last:pb-0">
                  <h3 className="text-white font-semibold mb-1">{resource.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{resource.description}</p>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:text-gold-300 text-sm"
                  >
                    Visit Website →
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning Signs */}
        <Card className="bg-navy-800 border-navy-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Heart className="w-6 h-6 mr-3 text-gold-400" />
              Warning Signs to Watch For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              If you or someone you know is experiencing any of these warning signs, please reach out for help immediately:
            </p>
            <ul className="grid md:grid-cols-2 gap-2">
              {warningSigns.map((sign, index) => (
                <li key={index} className="text-gray-300 flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span className="text-sm">{sign}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-gold-900/20 border border-gold-500/30 rounded-lg">
              <p className="text-gold-200 text-sm">
                <strong>Remember:</strong> You are not alone. There are people who want to help, and there are resources available 24/7. 
                Your life has value, and there is hope for better days ahead.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default CrisisResources;
