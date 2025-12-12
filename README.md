# 🍿 usePopcorn

A modern, feature-rich movie discovery and rating application built with React 19. Search for movies, view detailed information, rate your favorites, and track your watched list—all with a beautiful, intuitive interface.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎬 Movie Discovery

- **Real-time Search**: Instant movie search powered by the OMDB API with debounced queries
- **Movie Details**: Comprehensive movie information including plot, cast, director, ratings, and more
- **Responsive Design**: Clean, modern UI that works seamlessly across all devices

### ⭐ Rating System

- **Interactive Star Rating**: Custom-built star rating component (1-10 scale)
- **Dual Ratings**: Compare IMDB ratings with your personal ratings
- **Rating Statistics**: Track average ratings across your watched movies

### 📊 Watchlist Management

- **Persistent Storage**: Automatically saves your watched movies using localStorage
- **Watch Statistics**: View comprehensive statistics including:
  - Total movies watched
  - Average IMDB rating
  - Average user rating
  - Average runtime
- **Easy Management**: Add and remove movies from your watched list with ease

### 🎯 User Experience

- **Keyboard Shortcuts**: Press `Escape` to close movie details for faster navigation
- **Loading States**: Smooth loading indicators during API requests
- **Error Handling**: Graceful error messages for failed requests or missing movies
- **Optimized Performance**: Request cancellation to prevent race conditions and unnecessary API calls

## 🛠️ Tech Stack

- **React 19.2.0** - Latest React with modern hooks and patterns
- **Vite 7.2.4** - Lightning-fast build tool and dev server
- **OMDB API** - Movie database integration
- **Custom Hooks** - Reusable, composable logic
- **LocalStorage API** - Client-side data persistence
- **ESLint** - Code quality and consistency

## 🏗️ Architecture Highlights

### Custom Hooks

The application leverages custom React hooks for clean, reusable logic:

- **`useMovies`**: Handles movie search with:

  - Automatic API request cancellation using AbortController
  - Loading and error state management
  - Query debouncing to minimize API calls

- **`useLocalStorageState`**: Custom hook for persistent state:

  - Seamlessly syncs state with localStorage
  - Handles JSON serialization/deserialization
  - Provides React state interface with persistence

- **`useKey`**: Keyboard event handler:
  - Clean event listener management
  - Automatic cleanup on unmount
  - Reusable for any keyboard shortcut

### Component Structure

```
src/
├── components/
│   ├── layout/          # Navigation and main layout components
│   ├── movie/           # Movie search and details components
│   ├── watched/         # Watchlist management components
│   └── ui/              # Reusable UI components (Loader, Error, StarRating)
├── hooks/               # Custom React hooks
├── config/              # Configuration and constants
└── utils/               # Utility functions
```

### Key Technical Implementations

1. **Request Cancellation**: Uses `AbortController` to cancel in-flight requests when:

   - Component unmounts
   - New search query is entered
   - User navigates away

2. **State Management**:

   - Local component state for UI interactions
   - Custom localStorage hook for persistence
   - Optimized re-renders with proper dependency arrays

3. **Error Boundaries**: Comprehensive error handling at multiple levels:

   - Network errors
   - API response errors
   - User-friendly error messages

4. **Performance Optimizations**:
   - Conditional rendering to prevent unnecessary API calls
   - Efficient array operations for statistics
   - Minimal re-renders through proper state management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OMDB API key ([Get one here](http://www.omdbapi.com/apikey.aspx))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd use-popcorn
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_OMDB_API_KEY=your_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Key Features in Detail

### Movie Search

- Type to search movies in real-time
- Results update automatically as you type
- Displays movie posters, titles, and release years
- Click any movie to view detailed information

### Movie Details

- Full movie information including:
  - Plot summary
  - Cast and crew
  - Genre and runtime
  - IMDB rating
- Interactive star rating system
- Add movies to your watched list with your rating

### Watchlist

- View all movies you've watched
- See statistics about your viewing habits
- Remove movies from your list
- All data persists across browser sessions

## 🔧 Development

### Code Quality

- ESLint configured with React best practices
- Consistent code formatting
- Component-based architecture
- Separation of concerns (hooks, components, config)

### Best Practices Implemented

- ✅ Custom hooks for reusable logic
- ✅ Proper cleanup in useEffect hooks
- ✅ Error handling and loading states
- ✅ Accessibility considerations
- ✅ Performance optimizations
- ✅ Clean component structure
- ✅ Environment variable management

## 📄 License

This project is part of a learning course and is for educational purposes.

## 👨‍💻 Author

Built as part of "The Ultimate React Course 2025" - demonstrating modern React patterns, custom hooks, API integration, and state management.

---

**Note**: This project requires an OMDB API key to function. Make sure to add your API key to the `.env` file before running the application.
