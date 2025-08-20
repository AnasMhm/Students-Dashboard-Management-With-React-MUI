import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import "@fontsource/cairo";
import "@fontsource/cairo/300.css";
import "@fontsource/cairo/600.css";
import "@fontsource/cairo/700.css";
import { ThemeProvider } from '@mui/material';
import theme from './theme.js';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
