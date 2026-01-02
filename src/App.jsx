import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router';
import { router } from './app/router.jsx';

function App(props) {
  return (
    <RouterProvider router={router} />
  );
}

export default App;