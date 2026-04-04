import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
// Handle hash-based navigation BEFORE React renders
// This ensures the correct page loads immediately without redirect
(function () {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        // Map hash to path
        const pathMap = {
            'create-test': '/create-test',
            'take-test': '/take-test',
            'profile': '/profile',
        };
        const newPath = pathMap[hash];
        if (newPath) {
            // Replace URL with correct path (no hash)
            window.history.replaceState(null, '', newPath);
        }
    }
})();
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
//# sourceMappingURL=main.js.map