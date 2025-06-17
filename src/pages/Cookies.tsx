
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Cookie Policy</h1>
          <p className="text-gray-300">Last updated: December 17, 2024</p>
        </div>

        <div className="space-y-8">
          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">What Are Cookies</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you 
                visit our website. They allow us to remember your preferences and improve your experience.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">How We Use Cookies</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>We use cookies for the following purposes:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Authentication:</strong> To keep you logged in securely</li>
                <li><strong>Preferences:</strong> To remember your settings (like anonymous mode)</li>
                <li><strong>Analytics:</strong> To understand how our site is used and improve it</li>
                <li><strong>Security:</strong> To protect against fraud and abuse</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Types of Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Essential Cookies</h4>
                <p>These cookies are necessary for the website to function and cannot be switched off.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Functional Cookies</h4>
                <p>These cookies enable the website to provide enhanced functionality and personalization.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Analytics Cookies</h4>
                <p>These cookies allow us to count visits and traffic sources to measure and improve performance.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Managing Cookies</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                You can control and/or delete cookies as you wish. You can delete all cookies that are 
                already on your computer and you can set most browsers to prevent them from being placed.
              </p>
              <p>
                However, if you do this, you may have to manually adjust some preferences every time you 
                visit a site and some services and functionalities may not work.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                If you have any questions about our use of cookies, please contact us at{' '}
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

export default Cookies;
