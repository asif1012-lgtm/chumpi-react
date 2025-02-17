VITE_EMAILJS_USER_ID=your_emailjs_user_id_here
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id_here
VITE_EMAILJS_VALIDATION_TEMPLATE_ID=your_validation_template_id
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_confirmation_template_id
```

Critical Rules:
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

## Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment Steps

1. Fork or clone the repository
```bash
git clone https://github.com/asif1012-lgtm/asif11.git
cd asif11
```

2. Install Vercel CLI (optional)
```bash
npm i -g vercel
```

3. Deploy to Vercel
   - Option 1: Using Vercel CLI
   ```bash
   vercel