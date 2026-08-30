import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GymProvider } from './context/GymContext';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GymProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </GymProvider>
    </BrowserRouter>
  </React.StrictMode>
);
