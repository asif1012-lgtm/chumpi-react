import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ValidationForm, ConfirmationForm, formDataSchema } from '../shared/schema';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: ValidationForm | ConfirmationForm = request.body;

    // Store timestamp and additional metadata
    const submission = {
      ...formData,
      timestamp: new Date().toISOString(),
      userAgent: request.headers['user-agent'],
      ipAddress: request.headers['x-forwarded-for'] || request.socket.remoteAddress
    };

    // Validate the submission data
    const validatedData = formDataSchema.parse(submission);

    // Return success response
    return response.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      data: validatedData
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return response.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process form submission'
    });
  }
}