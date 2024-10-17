import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from './components/ui/skeleton';
import NavBar from './components/nav';
import { DarkModeProps } from './types/types';
import * as PictureApi from './api/pictureApi';
import PageButtons from './components/pageButtons';
import usePage from './hooks/usePage';
import './App.css';

function App({ darkMode, toggleDarkmode }: DarkModeProps ) {
  const [ pictureListData, setPictureListData ] = useState<any[]>([]);
  const [ searchData, setSearchData ] = useState<any[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const { page , handleNextPage, handlePrevPage } = usePage(1);

  const listPictures = async () => {
    try {
      setIsLoading(true);
      const result = await PictureApi.getPhotos(page);
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
  }, [page]);

  return (
    <div className={`relative flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
      <NavBar handleSearch={handleSearch} toggleDarkmode={toggleDarkmode} darkMode={darkMode}/>
      <div id="Home" className="max-h-* flex flex-wrap overflow-hidden justify-center gap-3 px-4 py-8 dark:bg-darkMode-colors-background duration-200" >
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
                image: pic.urls.regular,
                imageDescription: pic.alt_description,
                place: pic.location ? pic.location.name : 'Unknown',
                likes: pic.likes,
              }}
            >
              <img
                id={pic.id}
                src={pic.urls.regular}
                alt={pic.alt_description || 'Image'}
                title={pic.alt_description || 'No description'}
                className="w-full h-80 grow"
              />
            </Link>
          ))
        )}
      </div>
      <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode}/>
    </div>
  );
};

export default App;
