import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from './components/ui/skeleton';
import { ChevronLeft, ChevronRight  } from 'lucide-react';
import NavBar from './components/nav';
import { DarkModeProps } from './types/types';
import * as PictureApi from './api/pictureApi';
import './App.css';

function App({ darkMode, toggleDarkmode }: DarkModeProps ) {
  const [pictureListData, setPictureListData] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);

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

  const handleNextPage = async () => {
    try {
      setPage((prevCount) => {
        const newPage = prevCount + 1;
        console.log("Current page:", newPage); 
        return newPage;
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handlePrevPage = async () => {
    try {
      setPage((prevCount) => {
        const newPage = prevCount > 0 ? prevCount - 1 : 0;
        console.log("Current page:", newPage); 
        return newPage;
      });
    } catch (error) {
      console.log(error)
    }
  }

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
      <div id="Home" className="max-h-full relative flex flex-wrap overflow-hidden justify-center gap-3 py-8 px-5 dark:bg-darkMode-colors-background duration-200" >
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
                imageDescription: pic.description,
                place: pic.location ? pic.location.name : 'Unknown',
              }}
            >
              <img
                id={pic.id}
                src={pic.urls.regular}
                alt={pic.description || 'Image'}
                title={pic.description || 'No description'}
                className="w-full h-80 grow"
              />
            </Link>
          ))
        )}
      <div className='fixed bottom-5 right-5 flex gap-2 z-20 '>
        <button onClick={handlePrevPage} className={`border-2 border-[#040506] rounded-sm dark:border-[#f9fafb]`} title='Previous Page'>{ darkMode ?<ChevronLeft color='#f9fafb' size={50}/> : <ChevronLeft color='#040506' size={50}/>}</button>
        <button onClick={handleNextPage} className={`border-2 border-[#040506] rounded-sm dark:border-[#f9fafb]`} title='Next Page'>{ darkMode ?<ChevronRight color='#f9fafb' size={50}/> : <ChevronRight color='#040506' size={50}/>}</button>
      </div>
      </div>
    </div>
  );
}

export default App;
