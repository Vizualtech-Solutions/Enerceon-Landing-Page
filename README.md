# Enerceon — website

Single-page website for **Enerceon**, the energy intelligence and management platform by VizualTech.
Next.js (App Router) + TypeScript, plain CSS (`app/globals.css`), no UI libraries.

## Run (port 7000)

The website runs on **port 7000** and listens on all network interfaces (`0.0.0.0`), so it
opens on this computer and on phones/tablets on the same Wi-Fi. (The Enerceon app itself
stays on port 3000 — the Live Preview opens it.)

```bash
npm install
copy .env.example .env.local      # Windows   (macOS/Linux: cp .env.example .env.local)
npm run dev                       # development, live reload
```

Production (faster, recommended for showing to customers):

```bash
npm run build
npm start
```

Both commands print the addresses to use, for example:

```
  Enerceon website
  This computer:   http://localhost:7000
  Phone / network: http://192.168.100.25:7000
```

Open the **Phone / network** address on the phone (not `localhost` — on a phone that means
the phone itself). `npm run urls` prints the addresses again at any time.

### If the phone still cannot open it

1. **Same network** — the phone must be on the same Wi-Fi as the computer (not mobile data,
   not a guest network). Some routers have *AP / client isolation*; turn it off for this network.
2. **Windows firewall** (most common cause) — run PowerShell **as Administrator** once:

   ```powershell
   # the Wi-Fi network must be "Private" (Public blocks incoming connections)
   Get-NetConnectionProfile
   Set-NetConnectionProfile -InterfaceAlias "Wi-Fi" -NetworkCategory Private

   # allow the website port
   New-NetFirewallRule -DisplayName "Enerceon Website (TCP 7000)" -Direction Inbound `
     -Protocol TCP -LocalPort 7000 -Action Allow -Profile Private,Domain
   ```

   If Windows showed a "Node.js — allow access" pop-up earlier and it was cancelled, also
   allow **Node.js JavaScript Runtime** for *Private networks* in
   *Windows Security › Firewall & network protection › Allow an app through firewall*.
3. **Check from the computer** that it listens on every interface:
   `netstat -ano | findstr :7000` → the line must show `0.0.0.0:7000` (or `[::]:7000`).
4. **macOS only** — port 7000 is used by *AirPlay Receiver*; switch it off in
   System Settings › General › AirDrop & Handoff.

Why it failed before: `next dev` serves its JavaScript only to network addresses it trusts
(`allowedDevOrigins`). The list was typed by hand, so the laptop's current Wi-Fi address was not
on it and the phone received the page without its scripts — and the sections stayed invisible
because they only appear once the scripts run. Now `next.config.mjs` trusts this computer's
addresses (detected at start-up) and all private LAN ranges automatically, and the page content
is visible even if a script is slow or blocked.

## Settings (`.env.local`)

Copy `.env.example` to `.env.local` and fill it in. `.env.local` is ignored by git (see `.gitignore`)
— never commit it and never paste the SMTP password anywhere in the code.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_ENERCEON_APP_URL` | Page opened (in a new tab) by **Open Live Demo**. Default: `http://192.168.100.202:3000/registration`. Public — no secrets. |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` (port 587 uses STARTTLS; TLS is still required) |
| `SMTP_USER` | The Gmail address that sends the form e-mails |
| `SMTP_PASS` | That account's **Google App Password** (16 characters) — not the normal Gmail password |
| `CONTACT_TO` | Optional. Inbox that receives the requests (default: `SMTP_USER`) |
| `CONTACT_TIMEZONE` | Optional. Time zone shown in the e-mail (default: `Asia/Karachi`) |
| `ALLOWED_DEV_ORIGINS` | Optional, development only: extra host names allowed to open `npm run dev`. |

Restart `npm run dev` (or rebuild for `npm start`) after changing `.env.local`.
On Vercel or another host, add the same variables in the project's **Environment Variables** settings.

### "Talk to us" form (Gmail SMTP)

- The form posts to `/api/contact` (`app/api/contact/route.ts`). The server validates the details
  again, then e-mails them to `CONTACT_TO` / `SMTP_USER` with `nodemailer` through Gmail.
- The visitor's address is set as **Reply-To**, so pressing *Reply* in Gmail answers the visitor.
- Protection: same-site check, honeypot field, size limit, 5 requests per 10 minutes per IP.
- SMTP details stay on the server; the browser only ever sees "sent" or a friendly error.
- **Create the App Password:** Google Account → Security → turn on 2-Step Verification →
  *App passwords* → create one named "Enerceon website" → paste the 16 characters into `SMTP_PASS`.
- If sending fails, the reason is printed in the server console (`[contact] sending failed: …`);
  `535` means the App Password is wrong.

### Live Preview notes

- **Open Live Demo** opens the Enerceon app in a **new tab** (nothing is embedded in the website).
- The address must be reachable by visitors. `192.168.x.x` works only inside your own network; for the
  public website use the app's public address (preferably https).

### Screenshots

- Product screenshots live in `public/assets/screens/` (WebP) and their pixel sizes in `lib/screens.ts`.
- They were upscaled 2× (Lanczos + light sharpening — no AI-generated content) and are served at
  quality 90. For the sharpest result, replace them with fresh captures from the app taken at 2× or
  3× browser zoom / device pixel ratio (same file names), and update the sizes in `lib/screens.ts`.

## Structure

```
app/
  layout.tsx          fonts, SEO metadata, JSON-LD
  page.tsx            the landing page
  globals.css         the whole design system (graphite + champagne gold)
  privacy/, terms/    legal pages (PageShell)
  not-found.tsx, robots.ts, sitemap.ts, manifest.ts
components/
  Landing.tsx         section order
  Header.tsx          sticky navigation, active section, mobile menu
  Hero.tsx  Features.tsx  Dashboards.tsx  Diagrams.tsx  Management.tsx
  Billing.tsx  Why.tsx  LivePreview.tsx  Contact.tsx  Footer.tsx
  Showcase.tsx        tabbed screen showcase      Shot.tsx  Lightbox.tsx  screenshots
  SectionHead.tsx  Icon.tsx  Reveal.tsx  PageShell.tsx  Disclosure.tsx
scripts/
  network-urls.mjs    prints the local and network addresses before dev/start
app/api/contact/route.ts  e-mails the "Talk to us" form through Gmail SMTP
lib/
  contact.ts          form validation rules (shared by browser and server)
  content.ts          all texts (features, tabs, steps)
  screens.ts          screenshot list with sizes
  site.ts             site URL, e-mails, Live Preview address
public/assets/screens real Enerceon screenshots (fictional demo data)
```

Sections: Home · Features · Dashboards · Diagrams · Management · Billing (with e-mail/WhatsApp delivery) ·
Why Enerceon · Live Preview · Contact. `/about` and `/contact` redirect to their sections.
