import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

/**
 * Client env (Vite `VITE_*`) — values sirf root `.env` / Vercel mein.
 * Next portfolio @ e:\portfolio\…\env.mjs jaisa: wahan RESEND_API_KEY / SITE_URL
 * server par hain; is SPA mein contact abhi EmailJS hai — Resend keys .env.example
 * section (B) mein documented hain, yahan bundle nahi hoti.
 */
export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_EMAILJS_SERVICE_ID: z.string().optional(),
    VITE_EMAILJS_TEMPLATE_ID: z.string().optional(),
    VITE_EMAILJS_PUBLIC_KEY: z.string().optional(),
    VITE_RECEIVER_EMAIL: z.string().optional(),
    VITE_LINKEDIN_URL: z.string().url().optional(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
