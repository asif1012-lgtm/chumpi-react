# Vercel Deployment Guide

## Prerequisites
- Your project is now pushed to GitHub at: https://github.com/asif1012-lgtm/asif11
- All EmailJS environment variables are ready

## Deployment Steps

1. Connect to Vercel
   - Go to https://vercel.com
   - Create a new project
   - Select your GitHub repository (asif1012-lgtm/asif11)

2. Configure Project
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

3. Environment Variables
   Add the following environment variables in Vercel dashboard:
   ```
   VITE_EMAILJS_USER_ID=your_user_id
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_VALIDATION_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_template_id
   NODE_ENV=production
   ```

4. Deploy
   - Click "Deploy"
   - Wait for the build to complete

## Post-Deployment Verification
- Check if the contact form loads correctly
- Verify if EmailJS integration works
- Test form submissions
- Ensure all styles and assets are loading properly

## Troubleshooting
If you encounter any issues:
1. Verify environment variables are set correctly in Vercel dashboard
2. Check build logs for any errors
3. Ensure all dependencies are being installed correctly
