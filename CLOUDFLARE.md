# Cloudflare Pages Deployment Guide

This document provides the correct configuration for deploying RelayList Frontend to Cloudflare Pages.

## Dashboard Configuration

### Build Settings
- **Framework preset:** Next.js
- **Build command:** `npx @cloudflare/next-on-pages`
- **Build output directory:** `/.vercel/output/static`

### Environment Variables
- **Node.js version:** `20.x` (recommended for better compatibility)
- **NPM version:** Latest

#### Application Environment Variables
Configure these in your Cloudflare Pages dashboard under Settings > Environment variables:

**Production:**
- `NEXT_PUBLIC_API_BASE_URL` = `https://api.relaylist.com`
- `NEXT_PUBLIC_API_TIMEOUT` = `10000` (optional)

**Preview:**
- `NEXT_PUBLIC_API_BASE_URL` = `https://api.relaylist.com` (or staging URL)
- `NEXT_PUBLIC_API_TIMEOUT` = `10000` (optional)

### Compatibility Configuration
This project includes a `wrangler.toml` file that sets the required Node.js compatibility flags:
- **nodejs_compat** - Enables Node.js API compatibility for both production and preview environments
- **compatibility_date** - Set to `2024-05-30` for stable API behavior

## Important Notes

### Updated Build Command
The build command has been updated from the legacy version:
- ~~Old:~~ `npx @cloudflare/next-on-pages@pre-v1 --experimental-minify`
- **New:** `npx @cloudflare/next-on-pages`

### Why This Changed
- Updated from pre-release (`@pre-v1`) to stable version `v1.13.13`
- Removed experimental flags that are now default or unnecessary
- Simplified command for better reliability

### Build Process
1. Cloudflare Pages runs the build command
2. Next.js builds the application
3. `@cloudflare/next-on-pages` converts the output for Cloudflare's edge runtime
4. Static assets are generated in `/.vercel/output/static/`

## Local Testing

Test the Cloudflare build locally before deploying:

```bash
# Build for Cloudflare Pages
npm run pages:build

# The output will be generated in .vercel/output/static/
```

## Deployment Steps

1. **Update Cloudflare Pages Dashboard:**
   - Go to your Cloudflare Pages project settings
   - Update the build command to: `npx @cloudflare/next-on-pages`
   - Ensure output directory is: `/.vercel/output/static`

2. **Trigger Deployment:**
   - Push changes to your connected Git repository
   - Cloudflare will automatically trigger a new build

3. **Verify Deployment:**
   - Check the build logs for successful completion
   - Test the deployed site functionality

## Troubleshooting

### Common Issues

**Build Fails with "unsupported version" warning:**
- Ensure you're using the updated build command without `@pre-v1`

**"Node.JS Compatibility Error - no nodejs_compat compatibility flag set":**
- This is resolved by the `wrangler.toml` file in the repository
- Ensure the `wrangler.toml` file is included in your deployment

**Dependencies installation errors:**
- Node.js v20.x or v22.x is recommended over v23.x for better compatibility

**"npm ci can only install packages when package.json and package-lock.json are in sync":**
- This has been resolved by regenerating the lock file
- Ensure both files are committed to the repository

**Static assets not loading:**
- Verify the output directory is set to `/.vercel/output/static`
- Check that the Content Security Policy allows necessary resources

### Build Logs
Monitor the Cloudflare Pages build logs for:
- Successful Next.js compilation
- Static asset generation (should show ~25 assets)
- No function detection (correct for static site)

## Performance Optimizations

The current build generates:
- **Static pages:** 4 pages (/, /404, /500, /info)
- **Assets:** ~25 static files
- **Bundle size:** ~162KB first load JS
- **Build time:** ~1-2 seconds compilation

## Security Features

The deployment includes:
- Content Security Policy headers via `next.config.js`
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- HTTPS-only external API connections

## Support

For deployment issues:
- Check [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site)
- Review [Next.js on Cloudflare Pages guide](https://github.com/cloudflare/next-on-pages)
- Check the project's build logs in Cloudflare dashboard