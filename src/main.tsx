import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'

// Handle page navigation BEFORE React renders
// This ensures the correct page loads immediately without redirect
(function() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  if (page) {
    // Map page parameter to path
    const pathMap: Record<string, string> = {
      'create-test': '/create-test',
      'take-test': '/take-test',
      'profile': '/profile',
    };
    const newPath = pathMap[page];
    if (newPath) {
      // Replace URL with correct path (no query params)
      window.history.replaceState(null, '', newPath);
    }
  }
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
