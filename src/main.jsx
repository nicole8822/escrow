import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * TrustVault Entry Point
 * Initializing React 18 Root with StrictMode for 
 * development-time side-effect verification.
 */

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Failed to find the root element. Ensure index.html has <div id='root'></div>");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* The App component now handles Routing and Global State.
        Strict Mode helps ensure our Framer Motion and Parallax 
        animations are cleaned up properly on unmount.
    */}
    <App />
  </React.StrictMode>
);
