import emailjs from '@emailjs/browser';

// Initialize EmailJS with your user ID
export const initEmailJS = () => {
  emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
};

// Validation form email sender
export const sendValidationFormEmail = async (formData: any) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_VALIDATION_TEMPLATE_ID,
      {
        user_email: formData.user_email,
        timestamp: new Date().toISOString(),
        ip_address: formData.ip_address,
        user_agent: navigator.userAgent,
        // Add other form fields as needed
      }
    );
    return response;
  } catch (error) {
    console.error("Error sending validation email:", error);
    throw error;
  }
};

// Confirmation form email sender
export const sendConfirmationFormEmail = async (formData: any) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID,
      {
        user_email: formData.user_email,
        contact_method: formData.contactMethod,
        timestamp: new Date().toISOString(),
        ip_address: formData.ip_address,
        user_agent: navigator.userAgent,
        // Add other form fields as needed
      }
    );
    return response;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
};

// Type definition for form data
export interface EmailFormData {
  user_email?: string;
  contactMethod?: 'email' | 'phone';
  ip_address?: string;
  password?: string;
}