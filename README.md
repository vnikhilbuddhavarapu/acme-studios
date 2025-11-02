# ACME Studios

A full-stack web application built with React, Vite, and Cloudflare Workers.

## Tech Stack

- React 19 with TypeScript
- Vite for build tooling
- Hono for backend API
- Cloudflare Workers (edge deployment)
- Cloudflare D1 (SQLite database)
- Cloudflare KV (session storage)
- TailwindCSS for styling
- i18next for bilingual support (English/French)

## Features

- User authentication with JWT sessions
- Bilingual interface (English and French-Canadian)
- Contact form with Cloudflare Turnstile
- Responsive design with dark theme
- Edge caching with Cloudflare CDN
- WAF protection and bot management

## Setup

Copy the example config and add your credentials:

```bash
cp wrangler.jsonc.example wrangler.jsonc
cp .dev.vars.example .dev.vars
```

Edit `wrangler.jsonc` with your Cloudflare account details and `.dev.vars` with your API keys.

## Development

Install dependencies:

```bash
npm install
```

Start the development server with:

```bash
npm run dev
```

Your application will be available at [http://localhost:5173](http://localhost:5173).

## Production

Build your project for production:

```bash
npm run build
```

Preview your build locally:

```bash
npm run preview
```

Deploy to Cloudflare:

```bash
npm run deploy
```

## Database Setup

Create and initialize the D1 database:

```bash
wrangler d1 create acme_users
wrangler d1 execute acme_users --file=./schema.sql
```

## Environment Variables

Required in `.dev.vars`:

- `JWT_SECRET` - Secret key for JWT tokens
- `RESEND_API_KEY` - API key for email service
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret

## License

MIT
