import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import PicturePage from './pages/picturePage.tsx';
import SearchPage from './pages/searchPage.tsx';
import CollectionsPage from './pages/collectionsPage.tsx'
import CollectionPage from './pages/collectionPage.tsx';
import { useState } from 'react';
import './index.css';

function Main() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkmode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App darkMode={darkMode} toggleDarkmode={toggleDarkmode} />,
    },
    {
      path: '/photo/:pictureId',
      element: <PicturePage darkMode={darkMode} toggleDarkmode={toggleDarkmode} />,
    },
    {
      path: '/search/:query',
      element: <SearchPage darkMode={darkMode} toggleDarkmode={toggleDarkmode} />,
    },
    {
      path: '/collections',
      element:<CollectionsPage darkMode={darkMode} toggleDarkmode={toggleDarkmode}/>
    },
    {
      path:"/collection/:collectionsId",
      element: <CollectionPage darkMode={darkMode} toggleDarkmode={toggleDarkmode}/>
    },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')!).render(
  <Main />
);
