VITE_EMAILJS_USER_ID=your_user_id
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_VALIDATION_TEMPLATE_ID=your_template_id
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_template_id
NODE_ENV=production
```

## Deployment Steps:

1. GitHub Setup:
   - Push your code to a GitHub repository.
   - Make sure all the following files are included:
     - vercel.json
     - api/contact-form.ts
     - api/vercel.ts
     - .env.production (do not include actual values)

2. Vercel Setup:
   - Connect your GitHub repository to Vercel.
   - Go to Project Settings > Environment Variables.
   - Add all required environment variables listed above.
   - These values can be found in your EmailJS dashboard.

3. Deploy:
   - Vercel will automatically deploy your application.
   - The build process will:
     - Build the frontend assets using Vite.
     - Deploy serverless API functions.
     - Set up proper routing.

4. Verify Deployment:
   - Check that the contact form UI is working.
   - Test form submissions.
   - Verify email notifications are being sent.

## Development

To run the project locally:

```bash
npm run dev
```

## Project Structure

```
/
├── api/                # Serverless API functions
│   └── contact-form.ts # Form submission endpoint
├── client/            # Frontend React application
├── shared/            # Shared types and utilities
└── vercel.json        # Deployment configuration
```

## Build Output Structure:

```
dist/
  ├── public/     # Static assets served by Vercel
  │   ├── assets/
  │   └── index.html