# MORANO Frontend Setup Instructions

A modern, responsive movie site frontend built with Vite + React and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Your backend API running on `http://localhost:5000`

### Installation

1. **Create the project:**
```bash
npm create vite@latest morano-frontend -- --template react
cd morano-frontend
```

2. **Install dependencies:**
```bash
npm install react-router-dom lucide-react axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Setup environment:**
```bash
cp .env.example .env
```
Edit `.env` to match your backend API URL.

4. **Replace the default files with the provided code:**
   - Copy all the component files into their respective folders
   - Update the configuration files (tailwind.config.js, vite.config.js)
   - Replace src/index.css with the provided styles

5. **Start the development server:**
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (Header, Footer, etc.)
│   ├── movie/           # Movie-specific components
│   └── ui/              # Basic UI components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API services
├── utils/               # Utility functions
└── styles/              # Global styles
```

## 🔧 Key Features

- **Responsive Design**: Works on all devices
- **Modern UI**: Dark theme with glassmorphism effects
- **Search & Filter**: Advanced search and filtering options
- **Movie Details**: Detailed movie information with download links
- **Performance**: Optimized with lazy loading and efficient rendering
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
  }
}
```

### API Integration
Update the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api'
```

## 🔗 API Integration

The frontend expects these API endpoints from your backend:

- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie
- `POST /api/movies` - Add new movie (admin)
- `PUT /api/movies/:id` - Update movie (admin)
- `DELETE /api/movies/:id` - Delete movie (admin)

## 🌟 Components Overview

### Pages
- **Home**: Main page with movie grid, search, and filters
- **MovieDetails**: Detailed movie page with download links
- **NotFound**: 404 error page

### Common Components
- **Header**: Navigation with responsive menu
- **Footer**: Site footer with links and branding
- **SearchBar**: Search functionality with filters
- **LoadingSpinner**: Loading states and skeletons

### Movie Components
- **MovieCard**: Individual movie display card
- **MovieGrid**: Grid layout for movies
- **MovieModal**: Popup with movie details
- **MovieFilters**: Advanced filtering options

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Deploy to Vercel:
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify:
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

## 🛠 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features
1. Create components in appropriate folders
2. Add new routes in `App.jsx`
3. Update API services in `services/`
4. Add custom hooks in `hooks/`

## 🔄 Backend Integration

Make sure your backend:
1. Has CORS enabled for the frontend URL
2. Returns data in the expected format
3. Handles errors properly
4. Supports the required endpoints

Example movie object structure:
```javascript
{
  _id: "string",
  title: "string",
  posterUrl: "string", 
  imdbRating: "string",
  genre: ["string"],
  director: "string",
  cast: ["string"],
  language: "string",
  videoQuality: ["string"],
  story: "string",
  downloadLinks: {
    "1080p": "string",
    "720p": "string",
    "480p": "string"
  },
  createdAt: "date",
  updatedAt: "date"
}
```

## 🎯 Future Enhancements

- User authentication and profiles
- Movie recommendations
- Advanced filtering (by year, rating, etc.)
- Watchlist and favorites
- Movie reviews and ratings
- Admin panel for movie management
- Progressive Web App (PWA) features

## 📞 Support

For issues and questions:
1. Check the console for errors
2. Verify API connectivity
3. Ensure all dependencies are installed
4. Check the network tab for failed requests