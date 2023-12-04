import './App.css';
import {  RouterProvider } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser } from './state/pb/config';
import { QueryStateWrapper } from './shared/wrappers/QueryStateWrapper';
import { LoaderElipse } from './shared/loaders/Loaders';
import { makeRouter } from './router';
import { MantineProvider } from '@mantine/core';

function App() {
  const query = useQuery({
    queryKey:['user'],
    queryFn:getUser
  }, );

  const user = query.data;

  const router = makeRouter(user)

  return (
    <QueryStateWrapper 
      query={query}
      loader={<LoaderElipse />}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className=" dark:bg-slate-900 h-full min-h-screen 
       dark:text-white dark:shadow-white"
      >
        <RouterProvider router={router} />
      </div>
      </MantineProvider>
    </QueryStateWrapper>
  );
}

export default App;
