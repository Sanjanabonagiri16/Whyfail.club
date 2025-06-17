
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-300">Last updated: December 17, 2024</p>
        </div>

        <div className="space-y-8">
          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                By accessing and using WhyFail.club, you accept and agree to be bound by the terms 
                and provision of this agreement. These terms apply to all users of the site.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Users agree to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Treat all community members with respect</li>
                <li>Not share harmful, offensive, or inappropriate content</li>
                <li>Respect others' privacy and anonymity choices</li>
                <li>Use the platform for its intended purpose of mental health support</li>
                <li>Report concerning behavior to moderators</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>You may not use our service:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Crisis Support Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                <strong>Important:</strong> WhyFail.club is not a substitute for professional mental health care. 
                Our crisis support features are designed to connect you with appropriate resources, but they 
                do not replace emergency services or professional therapy.
              </p>
              <p>
                If you are in immediate danger, please contact emergency services (911) or go to your 
                nearest emergency room.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Content Ownership</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                You retain ownership of content you create and share on WhyFail.club. By posting content, 
                you grant us a license to use, display, and distribute that content within our platform 
                for the purpose of providing our services.
              </p>
              <p>
                We reserve the right to remove content that violates our community guidelines or these terms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Account Termination</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the service will cease immediately. You may delete 
                your account at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
