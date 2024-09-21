
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import PicturePage from './pages/picturePage.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
  },
  {
    path:"/photo/:pictureId",
    element:<PicturePage/>,
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
