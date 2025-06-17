
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageCircle, Globe, Clock, Heart, AlertTriangle, MapPin, Users, BookOpen, Video } from 'lucide-react';
import SOSButton from '@/components/SOSButton';

const CrisisResources = () => {
  const emergencyContacts = [
    {
      name: "988 Suicide & Crisis Lifeline",
      number: "988",
      description: "24/7 free and confidential support for people in distress, prevention and crisis resources",
      type: "call",
      website: "https://988lifeline.org"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 crisis support via text message with trained crisis counselors",
      type: "text",
      website: "https://crisistextline.org"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "24/7 treatment referral and information service for mental health and substance abuse",
      type: "call",
      website: "https://samhsa.gov"
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "For immediate life-threatening emergencies",
      type: "emergency",
      website: null
    }
  ];

  const onlineResources = [
    {
      name: "National Alliance on Mental Illness (NAMI)",
      url: "https://nami.org",
      description: "Mental health education, support groups, and advocacy resources",
      icon: Users
    },
    {
      name: "Mental Health America",
      url: "https://mhanational.org",
      description: "Mental health screening tools, resources, and advocacy",
      icon: Heart
    },
    {
      name: "Crisis Chat (988 Lifeline)",
      url: "https://988lifeline.org/chat",
      description: "Online chat with trained crisis counselors available 24/7",
      icon: MessageCircle
    },
    {
      name: "BetterHelp Crisis Resources",
      url: "https://betterhelp.com/get-started",
      description: "Professional online therapy and crisis intervention resources",
      icon: Video
    },
    {
      name: "Psychology Today Therapist Finder",
      url: "https://psychologytoday.com/us/therapists",
      description: "Find mental health professionals in your area",
      icon: MapPin
    },
    {
      name: "MindTools Stress Management",
      url: "https://mindtools.com/stress-management",
      description: "Evidence-based stress management and resilience building tools",
      icon: BookOpen
    }
  ];

  const specializedResources = [
    {
      category: "Veterans",
      resources: [
        {
          name: "Veterans Crisis Line",
          contact: "1-800-273-8255 (Press 1)",
          description: "24/7 confidential support for veterans in crisis"
        },
        {
          name: "Veterans Chat",
          contact: "VeteransCrisisLine.net/Chat",
          description: "Online chat support for veterans"
        }
      ]
    },
    {
      category: "LGBTQ+",
      resources: [
        {
          name: "The Trevor Project",
          contact: "1-866-488-7386",
          description: "24/7 suicide prevention for LGBTQ+ youth"
        },
        {
          name: "Trans Lifeline",
          contact: "877-565-8860",
          description: "Crisis support for transgender individuals"
        }
      ]
    },
    {
      category: "Substance Abuse",
      resources: [
        {
          name: "SAMHSA Treatment Locator",
          contact: "1-800-662-4357",
          description: "Find substance abuse treatment facilities"
        },
        {
          name: "Narcotics Anonymous",
          contact: "818-773-9999",
          description: "12-step recovery program support"
        }
      ]
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
    "Displaying extreme mood swings",
    "Giving away prized possessions",
    "Saying goodbye to loved ones",
    "Putting affairs in order, making a will"
  ];

  const copingStrategies = [
    "Reach out to a trusted friend, family member, or counselor",
    "Practice deep breathing or meditation exercises",
    "Engage in physical activity or go for a walk",
    "Write in a journal about your feelings",
    "Listen to calming music or practice mindfulness",
    "Take a warm bath or shower",
    "Call a crisis hotline to talk to someone",
    "Remove yourself from triggering situations",
    "Practice grounding techniques (5-4-3-2-1 method)",
    "Remind yourself that difficult feelings are temporary"
  ];

  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Crisis Resources
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Immediate help and support when you need it most. You are not alone.
          </p>
          <div className="flex justify-center animate-scale-in">
            <SOSButton className="text-lg px-6 py-3 hover-scale" />
          </div>
        </div>

        {/* Emergency Contacts */}
        <Card className="bg-red-900/20 border-red-500/30 mb-6 md:mb-8 animate-slide-in">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center text-xl md:text-2xl">
              <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 mr-3" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:gap-6">
              {emergencyContacts.map((contact, index) => (
                <div 
                  key={index} 
                  className="bg-navy-800 p-4 md:p-6 rounded-lg hover-scale transition-all duration-300 hover:bg-navy-700"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {contact.type === 'call' && <Phone className="w-5 h-5 text-red-400 mr-2" />}
                        {contact.type === 'text' && <MessageCircle className="w-5 h-5 text-red-400 mr-2" />}
                        {contact.type === 'emergency' && <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />}
                        <h3 className="text-white font-semibold text-lg md:text-xl">{contact.name}</h3>
                      </div>
                      <p className="text-gold-400 font-mono text-lg md:text-xl mb-2">{contact.number}</p>
                      <p className="text-gray-300 text-sm md:text-base">{contact.description}</p>
                    </div>
                    {contact.website && (
                      <a 
                        href={contact.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gold-400 hover:text-gold-300 text-sm transition-colors story-link"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Online Resources */}
        <Card className="bg-navy-800 border-navy-700 mb-6 md:mb-8 animate-slide-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-xl md:text-2xl">
              <Globe className="w-6 h-6 md:w-8 md:h-8 mr-3 text-gold-400" />
              Online Resources & Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {onlineResources.map((resource, index) => (
                <div 
                  key={index} 
                  className="border border-navy-600 p-4 md:p-6 rounded-lg hover-scale transition-all duration-300 hover:border-gold-500/50 hover:bg-navy-700/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-3">
                    <resource.icon className="w-6 h-6 text-gold-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2 text-lg">{resource.name}</h3>
                      <p className="text-gray-300 text-sm md:text-base mb-3">{resource.description}</p>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gold-400 hover:text-gold-300 text-sm transition-colors story-link"
                      >
                        Visit Resource →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Specialized Resources */}
        <Card className="bg-navy-800 border-navy-700 mb-6 md:mb-8 animate-slide-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-xl md:text-2xl">
              <Users className="w-6 h-6 md:w-8 md:h-8 mr-3 text-gold-400" />
              Specialized Support Groups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {specializedResources.map((category, categoryIndex) => (
                <div 
                  key={categoryIndex}
                  className="space-y-4"
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  <h3 className="text-gold-400 font-semibold text-lg border-b border-gold-500/30 pb-2">
                    {category.category}
                  </h3>
                  {category.resources.map((resource, resourceIndex) => (
                    <div 
                      key={resourceIndex}
                      className="bg-navy-700/50 p-4 rounded-lg hover-scale transition-all duration-300"
                    >
                      <h4 className="text-white font-medium mb-1">{resource.name}</h4>
                      <p className="text-gold-400 text-sm font-mono mb-2">{resource.contact}</p>
                      <p className="text-gray-300 text-sm">{resource.description}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Immediate Coping Strategies */}
        <Card className="bg-navy-800 border-navy-700 mb-6 md:mb-8 animate-slide-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-xl md:text-2xl">
              <Heart className="w-6 h-6 md:w-8 md:h-8 mr-3 text-gold-400" />
              Immediate Coping Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6">
              When you're feeling overwhelmed, try these evidence-based coping strategies:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {copingStrategies.map((strategy, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-navy-700/30 hover-scale transition-all duration-300"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-gold-400 mr-2 mt-1 flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm md:text-base">{strategy}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning Signs */}
        <Card className="bg-navy-800 border-navy-700 animate-slide-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-xl md:text-2xl">
              <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 mr-3 text-gold-400" />
              Warning Signs to Watch For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6">
              If you or someone you know is experiencing any of these warning signs, please reach out for help immediately:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {warningSigns.map((sign, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-red-900/10 hover-scale transition-all duration-300"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-red-400 mr-2 mt-1 flex-shrink-0">•</span>
                  <span className="text-gray-300 text-sm md:text-base">{sign}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 md:p-6 bg-gold-900/20 border border-gold-500/30 rounded-lg animate-fade-in">
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-gold-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gold-200 text-sm md:text-base leading-relaxed">
                    <strong>Remember:</strong> You are not alone. There are people who want to help, and there are resources available 24/7. 
                    Your life has value, and there is hope for better days ahead. Crisis situations are temporary, but the support you receive can provide lasting strength.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default CrisisResources;
