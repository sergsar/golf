import React, {Suspense, StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, CssBaseline, ThemeOptions, ThemeProvider} from '@mui/material';
import {Loading} from './components/Loading';

const themeOptions: ThemeOptions = {
    typography: {
        fontFamily: 'Poppins, sans-serif'
    }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <CssBaseline />
    <Suspense fallback={<Loading />}>
      <ThemeProvider theme={createTheme(themeOptions)}>
          <App />
      </ThemeProvider>
    </Suspense>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
