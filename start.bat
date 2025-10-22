# Start the GuessWho game

echo "Starting GuessWho Multiplayer Game..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Please run this script from the project root directory"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "Installing client dependencies..."
    cd client && npm install && cd ..
fi

if [ ! -d "server/node_modules" ]; then
    echo "Installing server dependencies..."
    cd server && npm install && cd ..
fi

echo "Starting both frontend and backend..."
npm run dev


