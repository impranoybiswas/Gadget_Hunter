# Gadget Hunter — E-commerce Gadget Shop

> Modern, role-based gadget e-commerce storefront built with Next.js + TypeScript.  
> Live demo: https://gadget-hunter-pranoy.vercel.app/

---

## Description

A trustable and reliable gadget store with a focus on user experience and security. Built with Next.js, MongoDB, NextAuth.js, and Tailwind CSS. Includes a secure payment gateway, PDF invoice generation, and a responsive UI.

---

## Features

- Role-based dashboards: Admin, Seller, Customer (protected routes & role checks).
- Product catalogue: categories, filters, search, pagination.
- Wishlist (persistent per user).
- Cart with quantity control and persistence.
- Order flow and order history.
- PDF invoice generation for orders (server-side or client-side).
- Local payment gateway adapter (sandbox & pluggable for production providers).
- Product reviews & ratings.
- Image upload support (Cloudinary / S3 / Next Image remote).
- Notifications via `react-hot-toast`.
- Auth with NextAuth (Google, Email, etc.) and role management.
- Security basics: password hashing (bcrypt), input validation, rate limiting suggestions.
- Responsive UI built with Tailwind CSS and Framer Motion animations.

---

## Tech Stack

- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS, Tailwind Forms
- **Auth**: NextAuth.js
- **DB**: MongoDB (official driver)
- **UI Motion**: Framer Motion
- **Toasts**: react-hot-toast
- **Hashing**: bcrypt
- **Forms & Validation**: react-hook-form + zod (recommended)
- **PDF**: pdf-js / server-side HTML → PDF (puppeteer/playwright)
- **Images**: ImageKit & Next.js Image with remote patterns

---

## Project Structure

```
/
├─ app/                      # Next.js App Router pages + layout
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ dashboard/
│  │  ├─ admin/
│  │  ├─ seller/
│  │  └─ customer/
│  └─ products/
├─ components/               # Reusable UI components
├─ lib/                      # DB, auth helpers, payment adapters, pdf generators
├─ hooks/                    # useCart, useWishlist, useAuth
├─ middleware.ts             # route protection & role checks
├─ pages/api/                # api routes (if any)
├─ server/                   # server controllers / services
├─ scripts/                  # seed scripts
├─ public/
├─ styles/
├─ tests/
├─ .env.example
├─ next.config.js
└─ README.md
```

Adjust the structure to match your repository if it differs.

---

## Database & Seeding

- MongoDB (official driver) for data storage.
- Seed data for products, users, and orders.

---

## Payment Gateway & PDF Billing

- The project uses an **adapter pattern** for payments. A local/sandbox adapter simulates transactions for development.
- For production, swap adapter to a live provider (Stripe, local bank API, SSL-compliant gateway).
- PDF invoices: generate server-side using HTML → PDF (puppeteer/playwright) or programmatically with `pdf-js`. Store invoice metadata and a PDF URL on the `orders` document after successful payment.

---

## Security & Best Practices

- Hash passwords with `bcrypt` and perform server-side validation.
- Validate and sanitize all inputs server-side.
- Use HTTPS in production and secure cookies (`Secure`, `HttpOnly`, `SameSite`).
- Protect sensitive routes with middleware and role checks.
- Rate-limit public endpoints (login, signup, checkout).
- Keep secrets out of version control; use environment variables in Vercel/Github Actions.

---

## Deployment

Recommended: **Vercel** for Next.js projects.

1. Push repo to GitHub.
2. Connect the repository in Vercel.
3. Set environment variables in Vercel project settings (mirror `.env.local`).
4. Deploy. For server-side PDF generation using puppeteer, verify the chosen deployment allows headless Chromium or use a separate service.

Other options: Netlify (with adapter changes), self-hosted VM, DigitalOcean App Platform.

---

## Roadmap / Suggested Improvements

- Multi-seller marketplace & payouts
- Real-time order status (WebSocket)
- Admin analytics (revenue, best sellers)
- Multi-currency & i18n support
- PWA support for offline browsing
- Email notifications (transactional emails)

---

## Contact

Maintained by **Pranoy** — Junior Full Stack Web Developer.  
Live demo: https://gadget-hunter-pranoy.vercel.app/
