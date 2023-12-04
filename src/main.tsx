import React from 'react';
import ReactDOM from 'react-dom/client';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App';
import './index.css';
import ErrorBoundary from './shared/errorboundary/ErrorBoundary';
import { MantineProvider } from '@mantine/core';




const queryClient: QueryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: async (data, variable, context, mutation) => {

      if (Array.isArray(mutation.meta?.invalidates)) {
        mutation.meta?.invalidates.forEach((key)=>{
          return queryClient.invalidateQueries({
            queryKey:key
          })
        })


      }}
  }),

  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS
          // theme={{ colorScheme: 'dark' }}
        >
        <App />
        </MantineProvider>
      </React.StrictMode>
    </QueryClientProvider>

  </ErrorBoundary>
);


