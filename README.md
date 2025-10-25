# GuessWho Multiplayer Game

A web-based multiplayer version of the classic "Guess Who" board game built with React, Node.js, and Socket.IO.

## 🎮 Features

- **Real-time Multiplayer**: Play with friends using unique room codes
- **Multiple Themes**: Choose from Superheroes, Celebrities, Politicians, Athletes, Historic Figures, and Musicians
- **Turn-based Gameplay**: Ask yes/no questions to eliminate characters
- **Live Chat**: Communicate with your opponent during the game
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd guesswho-game
   ```

2. **Install dependencies**

   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server` directory:

   ```env
   PORT=3001
   CLIENT_URL=http://localhost:5173
   MONGODB_URI=mongodb://localhost:27017/guesswho
   NODE_ENV=development
   ```

4. **Start MongoDB**

   Make sure MongoDB is running locally, or update the `MONGODB_URI` in your `.env` file to point to MongoDB Atlas.

### Running the Application

**Development Mode (Both Frontend and Backend)**

```bash
npm run dev
```

**Individual Services**

```bash
# Frontend only
npm run dev:client

# Backend only
npm run dev:server
```

**Production Mode**

```bash
npm run build
npm start
```

## 🎯 How to Play

1. **Create or Join a Room**

   - Enter your name
   - Create a new room or join with a room code
   - Share the room code with a friend

2. **Select a Theme**

   - Choose from 6 different character themes
   - Both players must agree on the theme

3. **Start Playing**
   - Each player gets a random secret character
   - Take turns asking yes/no questions
   - Eliminate characters based on answers
   - First to guess the opponent's character wins!

## 🛠️ Tech Stack

### Frontend

- **React** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Zustand** - State management
- **Socket.IO Client** - Real-time communication
- **React Router** - Navigation

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## 📁 Project Structure

```
guesswho-game/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # State management
│   │   └── utils/         # Helper functions
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── socket/        # Socket.IO handlers
│   │   ├── utils/         # Game utilities
│   │   └── index.js       # Server entry point
│   └── package.json
└── package.json           # Root package.json
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:client` - Start only the frontend
- `npm run dev:server` - Start only the backend
- `npm run build` - Build the frontend for production
- `npm start` - Start the backend in production mode
- `npm run install:all` - Install dependencies for all packages

### Environment Variables

**Server (.env)**

- `PORT` - Server port (default: 3001)
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:5173)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `client/dist`
4. Add environment variable: `VITE_SERVER_URL=https://your-backend-url.com`

### Backend (Render/Fly.io)

1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables from your `.env` file

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Update `MONGODB_URI` in your deployment environment

## 🎨 Customization

### Adding New Themes

1. Add character data to `server/src/utils/characters.js`
2. Update the theme list in `client/src/pages/LobbyPage.jsx`
3. Add theme preview emoji and description

### Styling

- Modify `client/tailwind.config.js` for theme colors
- Update `client/src/index.css` for custom components
- Use TailwindCSS classes throughout components

## 🐛 Troubleshooting

### Common Issues

1. **Socket connection failed**

   - Check if the server is running
   - Verify the `VITE_SERVER_URL` environment variable
   - Check CORS settings in the server

2. **MongoDB connection error**

   - Ensure MongoDB is running locally
   - Check the `MONGODB_URI` in your `.env` file
   - Verify network connectivity to MongoDB Atlas

3. **Room not found**
   - Rooms are stored in memory and reset on server restart
   - Make sure both players are using the same room code

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.



