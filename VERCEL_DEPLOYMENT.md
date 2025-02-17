VITE_EMAILJS_USER_ID=your_user_id
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_VALIDATION_TEMPLATE_ID=your_template_id
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_template_id
NODE_ENV=production
```

## Deployment Steps:

1. Ensure all environment variables are set in Vercel project settings
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy when changes are pushed to the main branch
4. The build process will:
   - Build the frontend assets using Vite
   - Bundle the server using esbuild
   - Deploy both static assets and server code

## Build Output Structure:

```
dist/
  ├── public/     # Static assets served by Vercel
  │   ├── assets/
  │   └── index.html
  └── server.js   # Bundled server code