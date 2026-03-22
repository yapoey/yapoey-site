# Feature: Contact Form Upgrade

## Backend: Appwrite ✅

Drop EmailJS entirely. Use Appwrite to store contact messages.

### Appwrite Collection: `contact_messages`
| Field | Type | Notes |
|-------|------|-------|
| name | string | sender name |
| email | string | sender email |
| subject | string | message subject |
| message | string | message body |
| createdAt | datetime | auto |
| read | boolean | default false |

### Admin Dashboard: `/admin/messages`
- Protected page (Appwrite auth)
- List all messages, mark as read, delete
- Simple table: date | name | email | subject | preview
- Click to expand full message

---

## Current Issues (other)

1. **Security:** Phone number hardcoded in `locale/en.js:388` → remove
2. **UX:** No loading state while sending
3. **UX:** No validation feedback
4. **UX:** No social links displayed
5. **UX:** Missing i18n on button (hardcoded English)
6. **Design:** Outdated 3-column layout with phone/email/location icons

---

## New Design

```
┌─────────────────────────────────────────────────────┐
│  Contact Me                                         │
│  Let's build something together                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [Name field]          [Email field]                │
│  [Subject field                    ]                │
│  [Message textarea                 ]                │
│                                                     │
│  [Send Message]  (with loading spinner)             │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Or reach me directly:                              │
│                                                     │
│  📧 yapoey@gmail.com                                │
│                                                     │
│  [GitHub] [LinkedIn] [YouTube] [Twitter/X]          │
└─────────────────────────────────────────────────────┘
```

---

## Security Fixes

### How It Works
1. User fills contact form on site
2. Frontend calls Nuxt server route `POST /api/contact`
3. Server route writes to Appwrite `contact_messages` collection
4. You log into `/admin/messages` to read messages

No email sending needed. Clean, simple, no third-party email service costs.

---

## Phone Number
- Remove `vPhone` from locale files completely
- Replace with a WhatsApp link: `https://wa.me/821026574633`
- Or just remove phone entirely — email is sufficient for a portfolio

---

## Social Links
Add to ContactArea and Footer:

```js
// locale/en.js — Common section
socials: {
  github: "https://github.com/yapoey",        // confirm username
  linkedin: "https://linkedin.com/in/yapoey", // confirm
  youtube: "https://youtube.com/@yapoey",     // confirm
  twitter: "",                                // add if exists
}
```

---

## Form UX Improvements

### Validation
- Required: name, email, message
- Email format check
- Show red border + error text under invalid fields
- Disable submit until all required fields valid

### Loading State
- Replace button text with spinner while sending
- Disable form during submission

### Success State
- Keep existing `EmailConfirm` component
- Improve it: green checkmark + "Message sent! I'll get back to you soon."
- Auto-dismiss after 3 seconds (current is 1.3s — too fast)

### Error State
- If send fails: show red message "Something went wrong. Email me directly at yapoey@gmail.com"

---

## i18n Fixes
Add missing translation keys:
```js
ContactArea: {
  ...existing keys...,
  sendMsg: "Send Message",    // was hardcoded in template
  sending: "Sending...",
  sent: "Message sent!",
  error: "Something went wrong. Email me directly.",
  orReach: "Or reach me directly:",
}
```

---

## Implementation Steps
1. Move EmailJS keys to .env + set allowed domains in EmailJS dashboard
2. Remove phone number from locale
3. Add social links to locale + Common
4. Redesign ContactArea component
5. Add loading/success/error states
6. Add proper form validation
7. Update Footer to show social icons
8. (Later) Migrate to Appwrite Function + Resend for server-side email
