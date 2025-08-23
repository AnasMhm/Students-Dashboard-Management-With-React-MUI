import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import "@fontsource/cairo";
import "@fontsource/cairo/300.css";
import "@fontsource/cairo/600.css";
import "@fontsource/cairo/700.css";
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProviderCustom } from './contexts/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <AuthProvider>
        <ThemeProviderCustom>
          <App />
        </ThemeProviderCustom>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
