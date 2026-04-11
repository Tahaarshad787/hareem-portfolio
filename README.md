# Hareem Studio — portfolio (Vite + React)

## Local run

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and add your EmailJS values (see below).

## Deploy on Vercel

1. Push this repo to GitHub (create an empty repo on GitHub, then):

   ```bash
   git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

2. Open [vercel.com](https://vercel.com) → **Add New** → **Project** → import that GitHub repo. Vite is auto-detected via `vercel.json`.

3. In the project → **Settings** → **Environment Variables**, add **all** of these (same names as in `.env.example`), for **Production** (and Preview if you want the form there too):

   | Name | Where to get it |
   |------|-----------------|
   | `VITE_EMAILJS_PUBLIC_KEY` | EmailJS → Account → API keys → Public Key |
   | `VITE_EMAILJS_SERVICE_ID` | EmailJS → Email Services → your service → Service ID |
   | `VITE_EMAILJS_TEMPLATE_ID` | EmailJS → Email Templates → your template → Template ID |
   | `VITE_RECEIVER_EMAIL` | Your inbox email (must match how you set the template) |

4. **Redeploy** after saving env vars (Deployments → … on latest → Redeploy).

CLI alternative (after `npx vercel login`): `npm run deploy`

## EmailJS template fields

The contact form sends: `sender_email`, `message`, `to_email`, `reply_to`. Your EmailJS template should use these so mail delivers correctly.
