# Meta Verified Project

## Overview
A React-based application with EmailJS integration for form handling.

## Deployment Instructions

### Prerequisites
- Node.js 20.x or later
- EmailJS account with configured templates

### Environment Variables
The following environment variables must be set in your Vercel project settings:

```env
VITE_EMAILJS_USER_ID=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_VALIDATION_TEMPLATE_ID=
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=
NODE_ENV=production
SESSION_SECRET=
```

### Deploying to Vercel

1. Connect your GitHub repository to Vercel:
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "Import Project"
   - Choose "Import Git Repository"
   - Select the repository

2. Configure the project:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: dist
   - Install Command: `npm install`

3. Add Environment Variables:
   - In your Vercel project settings, add all required environment variables
   - Make sure to add all EmailJS-related variables with the VITE_ prefix

4. Deploy:
   - Vercel will automatically deploy your application
   - Any future pushes to the main branch will trigger automatic deployments

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`

3. Start the development server:
   ```bash
   npm run dev
   ```

## Support
For any issues with the deployment, please refer to the Vercel documentation or contact support.
