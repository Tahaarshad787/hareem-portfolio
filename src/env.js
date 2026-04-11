import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

/**
 * Typed client env (Vite `VITE_*`), same idea as `src/env.mjs` in the Next portfolio.
 * Copy `.env.example` → `.env` locally; on Vercel/Netlify add the same keys in project settings.
 */
export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_EMAILJS_SERVICE_ID: z.string().optional(),
    VITE_EMAILJS_TEMPLATE_ID: z.string().optional(),
    VITE_EMAILJS_PUBLIC_KEY: z.string().optional(),
    VITE_RECEIVER_EMAIL: z.string().optional(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
