## Relay List Frontend

This is the frontend for [RelayList.com](https://relaylist.com). The backend can be found at [relaylist-api](https://github.com/mlapida/relaylist-api). The site uses Next.js and is hosted on Cloudflare Pages.

## Development

### Prerequisites
- Node.js 20.x or 22.x (recommended for compatibility)
- npm

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run pages:build` - Build for Cloudflare Pages
- `npm run pages:deploy` - Deploy to Cloudflare Pages
- `npm run pages:dev` - Development build with Cloudflare optimizations

## Deployment

The site is deployed to Cloudflare Pages. See [CLOUDFLARE.md](./CLOUDFLARE.md) for detailed deployment instructions and configuration.

### Quick Deployment Settings
- **Build command:** `npx @cloudflare/next-on-pages`
- **Output directory:** `/.vercel/output/static`
- **Node.js version:** 20.x

## Architecture

- **Framework:** Next.js 15.4.5
- **UI Library:** React Bootstrap
- **Data Table:** react-data-table-component
- **HTTP Client:** Axios
- **Date/Time:** Moment.js
- **Hosting:** Cloudflare Pages

## Security & Performance

- Content Security Policy (CSP) headers configured
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- React performance optimizations (memo, useMemo, useCallback)
- Accessibility improvements (ARIA labels, semantic HTML)
- Input validation for API responses

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Development guidance for AI assistants
- [TODO.md](./TODO.md) - Project roadmap and improvements
- [CLOUDFLARE.md](./CLOUDFLARE.md) - Deployment instructions