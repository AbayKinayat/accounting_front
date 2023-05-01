import React from 'react';
import { createRoot } from "react-dom/client";
import { App } from 'app/App';
import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider/StoreProvider';

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </React.StrictMode>
  )
}

