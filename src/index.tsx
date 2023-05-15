import React from 'react';
import { createRoot } from "react-dom/client";
import { App } from 'app/App';
import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider/StoreProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from 'app/providers/Router/config/router';
import { SnackbarProvider } from 'notistack';

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <StoreProvider>
        <SnackbarProvider>
          <RouterProvider
            router={router}
          />
        </SnackbarProvider>
      </StoreProvider>
    </React.StrictMode>
  )
}

