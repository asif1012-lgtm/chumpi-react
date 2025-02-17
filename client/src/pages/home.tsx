import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import MetaTags from "@/components/meta-tags";
import React from 'react';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <MetaTags 
        title="Multilingual Contact Form"
        description="Easy to use multilingual contact form for international communication"
      />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
              International Contact Form
            </h1>

            <div className="space-y-4 text-gray-600">
              <p className="text-center">
                Welcome to our multilingual contact form service. Connect with your audience across language barriers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Multiple language support</li>
                    <li>Real-time validation</li>
                    <li>Responsive design</li>
                    <li>Email notifications</li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h3 className="font-semibold mb-2">Supported Languages</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>English</li>
                    <li>Spanish</li>
                    <li>French</li>
                    <li>German</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setLocation("/contact")}
              className="w-full py-3 text-base bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Start Contact Form
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500 bg-white border-t">
        © {new Date().getFullYear()} International Contact Form. All rights reserved.
      </footer>
    </div>
  );
}