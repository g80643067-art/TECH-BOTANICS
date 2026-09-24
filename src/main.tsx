// React Fast Refresh guard for Vite dev server & iframe embeds
if (typeof window !== 'undefined') {
  (window as any).$RefreshReg$ = (window as any).$RefreshReg$ || (() => {});
  (window as any).$RefreshSig$ = (window as any).$RefreshSig$ || (() => (type: any) => type);
  (window as any).__vite_plugin_react_preamble_installed__ = true;
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {registerSW} from 'virtual:pwa-register';

// Register PWA service worker with immediate auto-update and safe fallback for iframes
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  try {
    registerSW({
      immediate: true,
      onRegisterError(error) {
        console.debug('Service worker registration note:', error);
      },
    });
  } catch (err) {
    console.debug('Service worker registration skipped:', err);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
