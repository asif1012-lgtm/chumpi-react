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
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: dist
   - Install Command: `npm install`

3. Add Environment Variables:
   - In your Vercel project settings, add all required environment variables
   - Make sure to add all EmailJS-related variables with the VITE_ prefix
   - Get your EmailJS credentials from your EmailJS dashboard
   - Set NODE_ENV to "production"

4. Deploy:
   - Vercel will automatically deploy your application
   - Any future pushes to the main branch will trigger automatic deployments
   - Make sure all routes (/, /validation, /confirmation, /success) are working

### Troubleshooting Deployment
If you encounter 404 errors:
1. Verify all environment variables are set correctly in Vercel
2. Ensure the build command executes successfully
3. Clear the Vercel project cache and redeploy if needed
4. Check that all routes are properly configured in vercel.json

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`

3. Start the development server:
   ```bash
   npm run dev