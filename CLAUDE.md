# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RelayList Frontend is a Next.js application that displays ActivityPub relay information for server administrators. It fetches data from the RelayList API (api.relaylist.com) and presents it in a sortable, expandable data table with detailed information about each relay.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Framework Stack
- **Next.js 13** - React framework with pages router
- **React Bootstrap** - UI component library
- **react-data-table-component** - Main data table functionality with expandable rows
- **axios** - HTTP client for API calls
- **moment** - Date/time formatting

### File Structure
- `pages/` - Next.js pages (index.js is main relay list, info.js is placeholder)
- `components/` - Reusable React components (layout, header, footer, navbar, title)
- `styles/` - CSS files including Bootstrap imports and custom styles

### Key Components
- **Layout** (`components/layout.js`) - Wraps pages with Header, Title, Footer in Bootstrap Container
- **DataTable** (`pages/index.js`) - Main feature displaying relay data with expandable rows
- **ExpandedComponent** - Shows detailed relay information (admin contact, URLs, notes, timestamps)

### Data Flow
1. Main page fetches relay data from `https://api.relaylist.com/relays` on mount
2. Data populates sortable table with columns: Name, Address, Participants, Registration, Online
3. Rows expand to show additional details including Mastodon/Pleroma endpoints
4. Status columns (Registration/Online) have conditional styling (green/red)

### Utility Functions
- `makeFediLink()` - Converts Fediverse handles to profile URLs
- `regStatus()` / `onlineStatus()` - Convert boolean values to display strings

### Deployment
- Hosted on Cloudflare Pages
- Backend API hosted separately at relaylist-api repository