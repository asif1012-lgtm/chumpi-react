import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Check if environment variables are properly loaded
  const emailjsConfig = {
    userId: process.env.VITE_EMAILJS_USER_ID,
    serviceId: process.env.VITE_EMAILJS_SERVICE_ID,
    validationTemplateId: process.env.VITE_EMAILJS_VALIDATION_TEMPLATE_ID,
    confirmationTemplateId: process.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID,
  };

  response.status(200).json({
    message: 'API is running',
    env: process.env.NODE_ENV,
    config: {
      hasUserId: !!emailjsConfig.userId,
      hasServiceId: !!emailjsConfig.serviceId,
      hasValidationTemplate: !!emailjsConfig.validationTemplateId,
      hasConfirmationTemplate: !!emailjsConfig.confirmationTemplateId,
    },
  });
}