VITE_EMAILJS_USER_ID=your_user_id
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_VALIDATION_TEMPLATE_ID=your_template_id
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_template_id
NODE_ENV=production
```

## Deployment Steps:

1. GitHub Setup:
   - Your code is already pushed to: https://github.com/asif1012-lgtm/asif11
   - Make sure all the following files are included:
     - vercel.json
     - client/
     - shared/
     - .env.production (do not include actual values)

2. Vercel Setup:
   - Log in to your Vercel dashboard
   - Click "New Project"
   - Import your GitHub repository (asif11)
   - Go to Project Settings > Environment Variables
   - Add all required environment variables listed above
   - These values can be found in your EmailJS dashboard

3. Build Configuration:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: dist
   - Install Command: `npm install`
   - Development Command: `npm run dev`

4. Deploy:
   - Click "Deploy"
   - Vercel will automatically:
     - Install dependencies
     - Build the frontend assets
     - Set up proper routing
     - Deploy your application

5. Verify Deployment:
   - Test the contact form UI
   - Submit test forms
   - Verify email notifications
   - Check multilingual support

## Troubleshooting

1. Build Failures:
   - Check build logs in Vercel dashboard
   - Verify all dependencies are listed in package.json
   - Ensure environment variables are set correctly

2. Runtime Errors:
   - Check browser console for errors
   - Verify EmailJS configuration
   - Test API endpoints using Vercel Functions logs

3. Email Issues:
   - Verify EmailJS credentials
   - Check email template IDs
   - Test email service connection

## Local Development

To run the project locally:

```bash
npm install
npm run dev
```

## Project Structure

```
/
├── client/            # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
├── shared/            # Shared types and utilities
└── vercel.json        # Vercel deployment configuration
```

## Support

For deployment issues:
- Check Vercel documentation: https://vercel.com/docs
- Visit EmailJS support: https://www.emailjs.com/docs
- Open an issue in the GitHub repository

Remember to never commit sensitive information like API keys or environment variables to version control.