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

## Deployment Steps

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
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
- Add each variable exactly as shown above
- Make sure to add them for all environments
- Do not use @ symbol or references

4. Deploy:
- Vercel will automatically deploy when you push to GitHub
- Monitor the deployment logs for any issues
- If you see environment variable errors, double-check your variables in Vercel dashboard


## Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev