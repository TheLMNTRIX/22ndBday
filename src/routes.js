// filepath: src/routes.js
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Import Pages
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import GalleryPage from './pages/GalleryPage';
import ReasonsPage from './pages/ReasonsPage'; // Keep this import pointing to the page wrapper
// Other page imports as they're created

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/timeline',
    element: <TimelinePage />,
  },
  {
    path: '/gallery',
    element: <GalleryPage />,
  },
  {
    path: '/reasons',
    element: <ReasonsPage />, // This now renders the wrapper page
  },
  // Add other routes as pages are created
  { path: '*', element: <HomePage /> } // Default to HomePage for unknown routes
]);

export default router;