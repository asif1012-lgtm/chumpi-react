npm install
   ```

2. Create a `.env` file based on `.env.example` with your credentials:

### Required Environment Variables:

#### Client-side (EmailJS)
- `VITE_EMAILJS_USER_ID`: Your EmailJS User ID
- `VITE_EMAILJS_SERVICE_ID`: Your EmailJS Service ID
- `VITE_EMAILJS_VALIDATION_TEMPLATE_ID`: Template ID for validation emails
- `VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID`: Template ID for confirmation emails

#### Server-side (SMTP)
- `SMTP_HOST`: SMTP server host (default: smtp.gmail.com)
- `SMTP_PORT`: SMTP server port (default: 587)
- `SMTP_USER`: SMTP account username
- `SMTP_PASS`: SMTP account password
- `ADMIN_EMAIL_1`: Primary admin email for notifications
- `ADMIN_EMAIL_2`: Secondary admin email (optional)
- `ADMIN_EMAIL_3`: Additional admin email (optional)

#### Application Settings
- `NODE_ENV`: Environment setting ('development' or 'production')
- `SESSION_SECRET`: Secret key for session management

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
Subject: Contact Form - Validation Request
Body:
Contact Form Validation Details:
- Name: {{name}}
- Email: {{email}}
- Message: {{message}}
- Timestamp: {{timestamp}}
- IP Address: {{ip_address}}
```

### Confirmation Email Template
```
Subject: Contact Form - Submission Confirmation
Body:
Thank you for your message:
- Name: {{name}}
- Email: {{email}}
- Message: {{message}}
- Timestamp: {{timestamp}}