import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/AuthProvider';
import LoadProvider from './context/LoadProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <LoadProvider>
        <Router>
          <App />
        </Router>
      </LoadProvider>
    </AuthProvider>
  </React.StrictMode>
);
