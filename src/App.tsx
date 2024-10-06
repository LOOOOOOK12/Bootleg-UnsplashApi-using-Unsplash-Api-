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
      <NavBar handleSearch={handleSearch} toggleDarkmode={toggleDarkmode} darkMode={darkMode} />
      <div id="Home" className="max-h-full flex flex-wrap overflow-hidden justify-center gap-5 py-8 px-5 dark:bg-darkMode-colors-background duration-200" >
        {isLoading ? (
          Array(30)
            .fill(0)
            .map((_, idx) => (
              <Skeleton key={idx} className="h-52 w-60" />
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
                src={pic.urls.full}
                alt={pic.description || 'Image'}
                title={pic.description || 'No description'}
                className="w-full h-80 grow"
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
