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

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_ENERCEON_APP_URL` | Page opened by **Live Preview**. Default: `http://192.168.100.202:3000/registration`. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms key for the demo-request form. Without it the form tells visitors to e-mail sales@enerceon.com. |
| `ALLOWED_DEV_ORIGINS` | Optional, development only: extra host names (comma separated) allowed to open `npm run dev`. |

`NEXT_PUBLIC_` values are public (built into the page). Never put passwords or tokens in them.
Restart `npm run dev` (or rebuild for `npm start`) after changing `.env.local`.

### Live Preview notes

- The preview loads the existing Enerceon registration page in an `<iframe>`, with **Full screen**
  and **Open in new tab**.
- `192.168.100.202:3000` must be reachable from the device viewing the website (same network,
  and port 3000 allowed in that machine's firewall).
- On the public website (https) the app address must also be **https**; browsers block an http
  page inside an https page. When that happens the button opens the page in a new tab instead.
- If the Enerceon app sends `X-Frame-Options: DENY` or a `Content-Security-Policy: frame-ancestors`
  header, allow the website's address, or visitors can use **Open in new tab**.

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
lib/
  content.ts          all texts (features, tabs, steps)
  screens.ts          screenshot list with sizes
  site.ts             site URL, e-mails, Live Preview address
public/assets/screens real Enerceon screenshots (fictional demo data)
```

Sections: Home · Features · Dashboards · Diagrams · Management · Billing (with e-mail/WhatsApp delivery) ·
Why Enerceon · Live Preview · Contact. `/about` and `/contact` redirect to their sections.
