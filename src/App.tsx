import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from './components/ui/skeleton';
import NavBar from './components/nav';
import { DarkModeProps } from './types/types';
import * as PictureApi from './api/pictureApi';
import './App.css';

function App({ darkMode, toggleDarkmode }: DarkModeProps ) {
  const [pictureListData, setPictureListData] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const listPictures = async () => {
    try {
      setIsLoading(true);
      const result = await PictureApi.getPhotos();
      setPictureListData(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    if (value.trim() === "") {
      setSearchData([]);
      return;
    } else {
      try {
        const result = await PictureApi.searchPictures(value);
        setSearchData(result);
        console.log(result);
      } catch (error) {
        console.log("Error while searching pictures:", error);
      }
    }
  };

  useEffect(() => {
    listPictures();
  }, []);

  return (
    <div className={`flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
      <NavBar handleSearch={handleSearch} handleDarkMode={toggleDarkmode} darkMode={darkMode} />
      <div id="Home" className="h-screen flex flex-wrap justify-center items-center gap-3 py-8 dark:bg-darkMode-colors-background">
        {isLoading ? (
          Array(30)
            .fill(0)
            .map((_, idx) => (
              <Skeleton key={idx} className="h-52 w-60" />
            ))
        ) : searchData.length > 0 ? (
          searchData.map((searchPic) => (
            <Link
              key={searchPic.id}
              to={`/photo/${searchPic.id}`}
              state={{
                image: searchPic.urls.raw,
                imageDescription: searchPic.description,
                place: searchPic.location ? searchPic.location.name : 'Unknown',
              }}
            >
              <img
                id={searchPic.id}
                src={searchPic.urls.raw}
                alt={searchPic.description || 'Image'}
                title={searchPic.description || 'No description'}
                className="h-52"
              />
            </Link>
          ))
        ) : (
          pictureListData.map((pic) => (
            <Link
              key={pic.id}
              to={`/photo/${pic.id}`}
              state={{
                image: pic.urls.raw,
                imageDescription: pic.description,
                place: pic.location ? pic.location.name : 'Unknown',
              }}
            >
              <img
                id={pic.id}
                src={pic.urls.raw}
                alt={pic.description || 'Image'}
                title={pic.description || 'No description'}
                className="h-52"
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
