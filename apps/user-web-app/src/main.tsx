import { initTheme } from '@repo/ui';
import '@repo/ui/theme/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './core/router.tsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const queryClient = new QueryClient();

const App = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    initTheme();
  }, []);
  return children;
};

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App>
        <RouterProvider router={router} />
      </App>
    </QueryClientProvider>
  </StrictMode>
);
