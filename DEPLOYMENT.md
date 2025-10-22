# GuessWho - Production Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Railway (Recommended - Easiest)

1. **Sign up at** [railway.app](https://railway.app)
2. **Connect your GitHub** repository
3. **Deploy Backend:**
   - Create new project
   - Add service → GitHub repo
   - Select `server` folder
   - Set environment variables:
     ```
     NODE_ENV=production
     CLIENT_URL=https://your-frontend-url.railway.app
     ```
4. **Deploy Frontend:**
   - Add another service
   - Select `client` folder
   - Set environment variables:
     ```
     VITE_SERVER_URL=https://your-backend-url.railway.app
     ```

### Option 2: Render (Free Tier Available)

1. **Sign up at** [render.com](https://render.com)
2. **Backend:**
   - New → Web Service
   - Connect GitHub repo
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     ```
     NODE_ENV=production
     CLIENT_URL=https://your-frontend-url.onrender.com
     ```
3. **Frontend:**
   - New → Static Site
   - Connect GitHub repo
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Environment Variables:
     ```
     VITE_SERVER_URL=https://your-backend-url.onrender.com
     ```

### Option 3: Vercel + Railway

1. **Frontend on Vercel:**
   - Import GitHub repo
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables:
     ```
     VITE_SERVER_URL=https://your-backend-url.railway.app
     ```
2. **Backend on Railway:** (Same as Option 1)

### Option 4: DigitalOcean App Platform

1. **Create App:**
   - Connect GitHub repo
   - Add Backend Service:
     - Source: `server` folder
     - Build Command: `npm install`
     - Run Command: `npm start`
   - Add Frontend Service:
     - Source: `client` folder
     - Build Command: `npm run build`
     - Output Directory: `dist`

## 🗄️ Database (Optional)

The game works **without a database** using in-memory storage. For production with persistence:

### MongoDB Atlas (Free Tier)

1. **Sign up at** [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Create cluster** (free tier available)
3. **Get connection string**
4. **Add to environment variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/guesswho
   ```

## 🔧 Environment Variables

### Backend (.env)

```
NODE_ENV=production
PORT=3001
CLIENT_URL=https://your-frontend-domain.com
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/guesswho
```

### Frontend (.env)

```
VITE_SERVER_URL=https://your-backend-domain.com
```

## 🐳 Docker Deployment

### Local Docker

```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Production Docker

```bash
# Build images
docker build -t guesswho-backend ./server
docker build -t guesswho-frontend ./client

# Run containers
docker run -d -p 3001:3001 --name backend guesswho-backend
docker run -d -p 5173:5173 --name frontend guesswho-frontend
```

## 📋 Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] Build commands tested locally
- [ ] Health check endpoints working
- [ ] SSL certificates configured (for production domains)

## 🔍 Testing Deployment

1. **Backend Health Check:**

   ```
   GET https://your-backend-url.com/health
   ```

2. **Frontend Loading:**

   ```
   GET https://your-frontend-url.com
   ```

3. **Game Flow Test:**
   - Create room
   - Join room
   - Select theme
   - Play game

## 🚨 Common Issues

1. **CORS Errors:** Update `CLIENT_URL` in backend
2. **Socket Connection Failed:** Check `VITE_SERVER_URL` in frontend
3. **Build Failures:** Ensure all dependencies are in package.json
4. **Port Issues:** Check PORT environment variable

## 💰 Cost Estimates

- **Railway:** $5/month for hobby plan
- **Render:** Free tier available
- **Vercel:** Free tier available
- **DigitalOcean:** $5/month minimum
- **MongoDB Atlas:** Free tier available

## 🎯 Recommended Setup

**For Testing:** Railway (Backend) + Vercel (Frontend)
**For Production:** DigitalOcean App Platform (Both services)
