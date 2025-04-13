// filepath: src/App.jsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes'; // Import the router configuration
import { BirthdayCakeProvider } from './context/BirthdayCakeContext'; // Import the provider
// import './styles/global.css'; // Import global styles if you have them

function App() {
  return (
    // Wrap the RouterProvider with the BirthdayCakeProvider
    <BirthdayCakeProvider>
      <RouterProvider router={router} />
    </BirthdayCakeProvider>
  );
}

export default App;