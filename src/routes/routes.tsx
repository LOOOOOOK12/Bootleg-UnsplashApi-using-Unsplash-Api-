import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "@/pages/mainpage.tsx";
import PicturePage from "../pages/picturePage.tsx";
import SearchPage from "../pages/searchPage.tsx";
import CollectionsPage from "../pages/collectionsPage.tsx";
import CollectionPage from "../pages/collectionPage.tsx";
import Topicsgallery from "../pages/topicsgallery.tsx";
import UserPage from "../pages/UserPage.tsx";
import Layout from "../layout/Layout";
import { NavBarProps } from "@/types/types.ts";

function routes({ darkMode, toggleDarkmode }: NavBarProps) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout darkMode={darkMode} toggleDarkmode={toggleDarkmode}>
          <MainPage darkMode={darkMode} toggleDarkmode={toggleDarkmode} />
        </Layout>
      ),
    },
    {
      path: "/photos/:pictureId",
      element: (
        <Layout darkMode={darkMode} toggleDarkmode={toggleDarkmode}>
          <PicturePage darkMode={darkMode} toggleDarkmode={toggleDarkmode} />
        </Layout>
      ),
    },
    {
      path: "/search/:query",
      element: (
        <Layout darkMode={darkMode} toggleDarkmode={toggleDarkmode}>
          <SearchPage darkMode={darkMode} toggleDarkmode={toggleDarkmode} />
        </Layout>
      ),
    },
    {
      path: "/collections",
      element: (
        <Layout darkMode={darkMode} toggleDarkmode={toggleDarkmode}>
          <CollectionsPage darkMode={darkMode} toggleDarkmode={toggleDarkmode} />
        </Layout>
      ),
    },
    {
      path: "/collections/:collectionsId/photos",
      element: (
        <Layout darkMode={darkMode} toggleDarkmode={toggleDarkmode}>
          <CollectionPage darkMode={darkMode} toggleDarkmode={toggleDarkmode} />
        </Layout>
      ),
    },
    {
      path: "/topics/:slug/photos",
      element: (
        <Layout darkMode={darkMode} toggleDarkmode={toggleDarkmode}>
          <Topicsgallery darkMode={darkMode} toggleDarkmode={toggleDarkmode} />
        </Layout>
      ),
    },
    {
      path:"/users/:username",
      element: (
        <Layout darkMode={darkMode} toggleDarkmode={toggleDarkmode}>
          <UserPage darkMode={darkMode} toggleDarkmode={toggleDarkmode} />
        </Layout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default routes;