import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AccessibilityProvider } from './context/AccessibilityContext'; // <-- Add this

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccessibilityProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AccessibilityProvider>
  </React.StrictMode>
);
