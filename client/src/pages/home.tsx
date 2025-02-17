import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useMobile } from "@/hooks/use-mobile";
import MetaTags from "@/components/meta-tags";
import React from 'react';

export default function Home() {
  const isMobile = useMobile();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <MetaTags 
        title="Contact Us | Home"
        description="Get in touch with us through our multilingual contact form"
      />

      <div
        className="w-full md:w-[42%] h-[27vh] md:h-screen shrink-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
        style={{
          background:
            "linear-gradient(130deg, rgba(249, 241, 249, 1) 0%, rgba(234, 243, 253, 1) 35%, rgba(237, 251, 242, 1) 100%)",
        }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#212529] mb-3 sm:mb-4">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-6 max-w-md">
          Get in touch with us using our multilingual contact form. We'll respond to your inquiry as soon as possible.
        </p>

        <Link href="/contact">
          <Button
            size={isMobile ? "default" : "lg"}
            className="px-6 sm:px-7 md:px-8 py-2 sm:py-2.5 rounded-md bg-primary hover:bg-primary/90 text-sm sm:text-base transition-colors duration-200"
          >
            Get Started
            <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </Link>

        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Available in multiple languages
          </p>
          <div className="flex gap-2 justify-center">
            <span className="px-2 py-1 bg-white/80 rounded text-xs">English</span>
            <span className="px-2 py-1 bg-white/80 rounded text-xs">Español</span>
            <span className="px-2 py-1 bg-white/80 rounded text-xs">Français</span>
            <span className="px-2 py-1 bg-white/80 rounded text-xs">Deutsche</span>
          </div>
        </div>
      </div>
    </div>
  );
}