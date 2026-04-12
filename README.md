# Hareem Studio — portfolio (Vite + React)

## Pehle local chalao

```bash
npm install
npm run dev
```

---

## Environment (.env) — pura setup

### Step 1: `.env` file banao

Project root par (jahan `package.json` hai), `.env.example` ko copy karke **`.env`** naam do:

**Windows (PowerShell):**

```powershell
cd "C:\Users\reactnativestudent\OneDrive\Documents\hareem\vite-project"
Copy-Item .env.example .env
```

Phir `.env` Cursor / VS Code se khol kar values bharo.

### Step 2: EmailJS par kya banana hai (https://www.emailjs.com)

1. **Account** banao / login.
2. **Email Services** → Gmail (ya jo bhi) connect karo → **Service ID** copy → `.env` mein `VITE_EMAILJS_SERVICE_ID=...`
3. **Email Templates** → **Create New Template** (jaise tumhara “Contact Us” screen) — pehle niche **fields theek karo**, phir **Save** dabao, phir **Template ID** copy karo.

   **Zaroori:** is website ka code sirf ye 4 variables bhejta hai — EmailJS template mein **`{{name}}` / `{{title}}` mat chhodo** warna khali dikhenge. In se replace karo:

   | EmailJS screen par | Tum kya likho |
   |--------------------|----------------|
   | **Subject** | Maslan `Naya message — {{sender_email}}` (ya jo subject chaho) |
   | **Content (body)** | Visitor ka message: `{{message}}` — bhejne wala email: `{{sender_email}}` — optional line: `Reply: {{reply_to}}` |
   | **To Email** | Ya to seedha `hareemnaz24@gmail.com` **ya** `{{to_email}}` (`.env` wali `VITE_RECEIVER_EMAIL` yahan aayegi) |
   | **Reply To** | `{{reply_to}}` (taake Gmail par Reply visitor ko jaye) |
   | **From Name** | Static: `Hareem Studio` (behtar) — **`{{name}}` hata do** kyunki site `name` nahi bhejti |
   | **From Email** | “Use Default Email Address” theek (jo service connect hai) |

   Sab set hone ke baad upar neele **Save** par click karo → **Email Templates** list mein wapas jao → apne template par click → **Template ID** copy (`template_...`) → `.env` mein `VITE_EMAILJS_TEMPLATE_ID=...`
4. **Public Key** (`VITE_EMAILJS_PUBLIC_KEY`) — ye **tum khud “banate” nahi**; EmailJS account ke sath **pehle se hoti hai** / dashboard par milti hai.

   - Browser mein kholo: **[https://dashboard.emailjs.com](https://dashboard.emailjs.com)** (login same jis se template bana rahe ho).
   - Upar **Account** (ya profile / gear) → **API Keys** wala section — kabhi left menu mein **“Account”** ya integration page par **“Public Key”** likha hota hai.
   - Jo lambi string dikhe (Public Key / User ID jaisa label ho sakta hai) — **Copy** karo.
   - `.env` mein **bina spaces, bina quotes** ek line:
     ```env
     VITE_EMAILJS_PUBLIC_KEY=yahan_paste
     ```
   - **Private Key** kabhi `.env` ya frontend mein mat dalo — sirf **Public** wali line chahiye (Vite is client par bhej sakta hai).
5. **`VITE_RECEIVER_EMAIL=`** par woh email likho jahan inbox mein message aana hai (template ke `To` se match karo).

### Step 3: dubara dev start

`.env` change hone ke baad:

```bash
npm run dev
```

Agar keys missing hon to contact form par error message aayega (configure wala).

**Important:** `src/env.js` mein keys **mat likho** — sirf `.env` mein. `env.js` sirf **EmailJS wale 4 `VITE_*`** names validate karta hai.

---

## `e:\portfolio` (Next) jaisi extra keys — Resend + SEO

Next portfolio mein `env.mjs` par **server** vars hoti hain: `RESEND_API_KEY`, `SITE_URL`, `GOOGLE_SITE_VERIFICATION_ID`.  
Is Vite site ka form **abhi EmailJS** use karta hai, lekin **`.env.example` section (B)** mein wahi naam likh diye hain taake tum **Vercel par same naming** rakh sako / baad mein server API add karo.

### Resend API key kaise nikalein

1. Browser mein jao: **[https://resend.com](https://resend.com)** → **Sign up** / login.  
2. Left sidebar → **API Keys** (kabhi **Settings → API Keys**).  
3. **Create API Key** → naam (e.g. `vite-portfolio`) → **Create**.  
4. Jo string dikhe ( **`re_` se shuru** ) — **ek dafa hi** dikh sakti hai → turant copy kar ke safe jagah mein save karo.  
5. `.env` mein **bina spaces / bina quotes**:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```
6. **Kabhi `VITE_RESEND...` mat banao** — warna key client bundle mein leak ho sakti hai.  
7. Vercel → **Environment Variables** → name **`RESEND_API_KEY`** (bina `VITE_`) → value paste → Save → **Redeploy**.

**Note:** Jab tak tum is repo mein Resend ke liye **serverless API** (`/api/...`) ya Next server action na likho, ye key **contact form use nahi karega** — form abhi EmailJS se chal raha hai. Key sirf **ready / portfolio jaisa env** ke liye hai.

### `SITE_URL` aur `GOOGLE_SITE_VERIFICATION_ID`

- **`SITE_URL`**: live site URL, maslan `https://abc.vercel.app` (Next / SEO tools ke liye).  
- **`GOOGLE_SITE_VERIFICATION_ID`**: Google Search Console verification code (optional).

Dono bhi **bina `VITE_`** Vercel + `.env` mein — `.env.example` (B) section dekho.

---

## Vercel par deploy

### 1) GitHub par code

Empty repo banao (README optional off rakho taake push conflict na ho), phir:

```bash
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2) Vercel

1. [vercel.com](https://vercel.com) → **Add New…** → **Project** → GitHub repo import.
2. Framework **Vite** auto (`vercel.json` already set).
3. **Deploy** (pehli dafa bina env bhi ho sakta hai — form tab tak kaam nahi karega jab tak Step 4 na ho).

### 3) Environment variables (zaroori — contact form ke liye)

**Project → Settings → Environment Variables** mein yeh **4** add karo ( naam bilkul yehi ):

| Variable | Kahan se |
|----------|----------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS → Email Services → Service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS → Email Templates → Template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS → Account → API keys → Public Key |
| `VITE_RECEIVER_EMAIL` | Tumhari receive karne wali email |

Environment: kam az kam **Production** select karo; chaho to **Preview** par bhi same add karo.

**Optional (portfolio jaisa):** `RESEND_API_KEY`, `SITE_URL`, `GOOGLE_SITE_VERIFICATION_ID` bhi wahan add kar sakti ho — naam `.env.example` section (B) jaisa, **`VITE_` prefix in par mat lagana**.

### 4) Redeploy

**Deployments** → latest deployment ke **⋯** → **Redeploy** (taake nayi env build mein aa jaye).

### 5) CLI (optional)

```bash
npx vercel login
npm run deploy
```

---

## EmailJS template (code ke saath match)

`App.jsx` ye JSON bhejta hai: `sender_email`, `message`, `to_email`, `reply_to` — template mein hamesha **`{{sender_email}}`**, **`{{message}}`**, **`{{to_email}}`**, **`{{reply_to}}`** use karo (EmailJS `{{...}}` format).
