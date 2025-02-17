Name: VITE_EMAILJS_USER_ID
Value: [Paste your actual EmailJS User ID here directly]
Environment: Production, Preview, Development

Name: VITE_EMAILJS_SERVICE_ID
Value: [Paste your actual EmailJS Service ID here directly]
Environment: Production, Preview, Development

Name: VITE_EMAILJS_VALIDATION_TEMPLATE_ID
Value: [Paste your actual Template ID here directly]
Environment: Production, Preview, Development

Name: VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID
Value: [Paste your actual Template ID here directly]
Environment: Production, Preview, Development
```

⚠️ CRITICAL RULES:
- Do NOT use @ symbols in the values
- Do NOT use references like @emailjs-user-id
- Enter the actual values directly from your EmailJS dashboard
- Double-check for typos in variable names
- Make sure to select all environments for each variable

## Step 2: Build Configuration

Framework Preset: Vite
Build Command: `npm run build`
Output Directory: dist
Install Command: `npm install`
Development Command: `npm run dev`

## Step 3: Deployment

1. After setting environment variables correctly:
   - Go back to the Deployments tab
   - Click "Redeploy" on your latest deployment
   - Select "Redeploy with existing build cache"

2. Monitor the deployment:
   - Watch the build logs for any errors
   - If you see environment variable errors:
     a. Return to Settings > Environment Variables
     b. Verify that values are entered correctly
     c. Ensure no @ symbols are present

## Testing the Deployment

1. Visit your deployed URL
2. Test the contact form functionality
3. Verify that emails are being sent correctly
4. Check the browser console for any errors

## Troubleshooting

If you see "references Secret" errors:
1. Go to Settings > Environment Variables
2. Delete ALL existing environment variables
3. Add them again one by one, ensuring:
   - No @ symbols in values
   - No references to secrets
   - Direct values are used
   - All environments are selected

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- EmailJS Documentation: https://www.emailjs.com/docs
- Open an issue in the repository: https://github.com/asif1012-lgtm/asif11/issues

Remember: Never commit sensitive information or API keys to your repository.

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