# Deploying Sphere Gallery to Vercel

## Prerequisites
- Vercel account ([sign up here](https://vercel.com))
- Vercel CLI (optional) or GitHub/GitLab integration

## Database Setup
Your app uses PostgreSQL. You'll need to set up a database:

### Option 1: Vercel Postgres
1. Go to your Vercel project dashboard
2. Navigate to the "Storage" tab
3. Create a new Postgres database
4. The `DATABASE_URL` will be automatically added to your environment variables

### Option 2: External Database (Neon, Supabase, etc.)
1. Create a PostgreSQL database with your preferred provider
2. Add the connection string as `DATABASE_URL` in Vercel environment variables

## Deployment Steps

### Method 1: Using Git Integration (Recommended)

1. **Push your code to GitHub/GitLab:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Configure your project:
     - Framework Preset: Other
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Add Environment Variables:**
   - In project settings, add:
     - `DATABASE_URL` - Your PostgreSQL connection string
     - `NODE_ENV` - `production`
     - Any other environment variables your app needs

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your app

### Method 2: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
4. **Add Environment Variables:**
   ```bash
   vercel env add DATABASE_URL
   ```

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

## Post-Deployment

### Run Database Migrations
After deployment, you need to push your database schema:

```bash
npm run db:push
```

Or set up a build hook in Vercel to run migrations automatically.

## Environment Variables

Make sure to add these in Vercel:

- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Set to `production`
- `SESSION_SECRET` - (if using sessions) Generate a secure random string

## Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `dependencies` not `devDependencies`

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Check if your database allows connections from Vercel IPs
- For Vercel Postgres, it should work automatically

### 404 Errors
- The `vercel.json` routes all traffic through Express
- Make sure your Express server handles client-side routing

## Important Notes

- The app uses Express.js for the backend and Vite for the frontend
- Static files are served from `dist/public`
- API routes should be handled by Express
- Make sure to build locally first to test: `npm run build && npm start`
