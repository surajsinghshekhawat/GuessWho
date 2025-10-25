#!/bin/bash

# GuessWho Deployment Script
echo "🚀 GuessWho Deployment Script"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "client" ] && [ ! -d "server" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📦 Building client..."
cd client
npm install
npm run build
cd ..

echo "📦 Building server..."
cd server
npm install
cd ..

echo "✅ Build complete!"
echo ""
echo "🌐 Deployment Options:"
echo "1. Railway (Recommended)"
echo "2. Render"
echo "3. Vercel + Railway"
echo "4. DigitalOcean"
echo "5. Docker"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🔧 Quick Railway Deploy:"
echo "1. Push to GitHub"
echo "2. Go to railway.app"
echo "3. Connect GitHub repo"
echo "4. Deploy server folder first"
echo "5. Deploy client folder second"
echo "6. Set environment variables"

