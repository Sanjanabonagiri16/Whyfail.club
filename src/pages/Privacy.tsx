
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: December 17, 2024</p>
        </div>

        <div className="space-y-8">
          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>We collect information you provide directly to us, such as:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Account information (name, email, profile details)</li>
                <li>Journal entries and stories you share</li>
                <li>Messages and comments in community features</li>
                <li>Crisis support requests when using SOS features</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide and maintain our services</li>
                <li>Generate emotional analytics and insights</li>
                <li>Moderate content for safety</li>
                <li>Provide crisis support when needed</li>
                <li>Improve our platform and user experience</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Anonymous Mode</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                When you enable anonymous mode, your identity is hidden from other users. However, 
                we may still maintain records for safety and moderation purposes.
              </p>
              <p>
                Anonymous posts cannot be traced back to your public profile, but our moderation 
                team may have access to this information for safety reasons.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Data Security</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                All data is encrypted in transit and at rest. We use industry-standard security 
                practices and regularly review our security measures.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Export your data</li>
                <li>Opt out of certain communications</li>
                <li>Request that we stop processing your data</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@whyfail.club" className="text-gold-400 hover:text-gold-300">
                  privacy@whyfail.club
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
