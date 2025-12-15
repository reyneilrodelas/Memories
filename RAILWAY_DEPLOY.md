# Deploying Sphere Gallery to Railway

## Why Railway?
- Built-in PostgreSQL database
- Automatic HTTPS
- Simple deployment process
- Great for full-stack Node.js apps
- Free tier available

## Quick Deployment Steps

### Method 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Go to Railway:**
   - Visit [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project"

3. **Add PostgreSQL Database:**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically create a database and set the `DATABASE_URL` variable

4. **Deploy Your App:**
   - Click "New" → "GitHub Repo"
   - Select your repository
   - Railway will automatically detect it's a Node.js app
   - It will use the build and start scripts from package.json

5. **Run Database Migrations:**
   Once deployed, you need to push your database schema. You can:
   
   **Option A:** Run locally (requires database access):
   ```bash
   npm run db:push
   ```
   
   **Option B:** Add a migration service in Railway:
   - In your Railway project, click on your service
   - Go to "Settings" → "Deploy"
   - Add a deploy hook or run manually from the Railway CLI

6. **Generate Domain:**
   - Click on your service
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
   - Your app will be live at `your-app.up.railway.app`

### Method 2: Deploy with Railway CLI

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Initialize Project:**
   ```bash
   railway init
   ```

4. **Add PostgreSQL:**
   ```bash
   railway add --plugin postgresql
   ```

5. **Deploy:**
   ```bash
   railway up
   ```

6. **Open Your App:**
   ```bash
   railway open
   ```

## Environment Variables

Railway automatically provides:
- `DATABASE_URL` - When you add PostgreSQL
- `PORT` - Automatically set by Railway

### Optional Environment Variables:
If your app needs additional variables, add them in Railway:
- Go to your service → "Variables" tab
- Add any custom variables (e.g., `SESSION_SECRET`)

## Database Migrations

After your first deployment:

```bash
# Set Railway as your environment
railway link

# Run migrations
railway run npm run db:push
```

Or add this to your build command in Railway settings:
```
npm run build && npm run db:push
```

## Project Structure

Railway will:
- Run `npm install` automatically
- Execute `npm run build` (builds both client and server)
- Start your app with `npm start`
- Serve on the PORT environment variable provided by Railway

## Monitoring & Logs

- View logs in real-time: Railway dashboard → Your service → "Deployments" tab
- Click on any deployment to see build and runtime logs
- Use `railway logs` from CLI

## Troubleshooting

### Build Fails
- Check logs in Railway dashboard
- Ensure all dependencies are in `dependencies`, not `devDependencies`
- Verify build command: `npm run build`

### App Crashes on Start
- Check runtime logs in Railway dashboard
- Verify `DATABASE_URL` is set (should be automatic with PostgreSQL plugin)
- Ensure `PORT` is used correctly in your server code

### Database Connection Issues
- Verify PostgreSQL plugin is added
- Check that `DATABASE_URL` variable exists in your service
- Railway's PostgreSQL is accessible automatically within the same project

### Can't Access App
- Generate a domain in Settings → Networking
- Check if the service is running (green status)
- Verify port binding in your Express app

## Custom Domain (Optional)

1. Go to your service → "Settings" → "Networking"
2. Click "Custom Domain"
3. Add your domain and configure DNS:
   - Type: CNAME
   - Name: your-subdomain (or @ for root)
   - Value: provided by Railway

## Cost

- Free tier: $5 credit/month
- Your app will likely fit within free tier for development
- PostgreSQL database included in the same cost

## Useful Commands

```bash
# Link to existing project
railway link

# View logs
railway logs

# Run commands in Railway environment
railway run <command>

# Open app in browser
railway open

# Check status
railway status
```

## Next Steps After Deployment

1. ✅ Verify app is running
2. ✅ Test database connectivity
3. ✅ Run database migrations
4. ✅ Generate and test your domain
5. ✅ Set up custom domain (optional)

Your Sphere Gallery app is now live on Railway! 🚀
