# Deployment Guide

## Prerequisites
- Node.js 18+
- npm 9+
- Git

## Environment Setup
1. Clone repository
2. Install dependencies
3. Configure environment variables

## Development
```bash
npm run dev
```

## Production Build
```bash
npm run build
```

## Deployment Process
1. Push changes to main branch
2. Netlify auto-deployment triggers
3. Build process runs
4. Site deploys to production

## Environment Variables
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_URL`

## Custom Domain Setup
1. Add domain in Netlify
2. Configure DNS settings
3. Enable HTTPS
4. Update DNS records

## Monitoring
- Netlify analytics
- Error tracking
- Performance monitoring