import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from './components/ui/skeleton';
import NavBar from './components/nav';
import { DarkModeProps } from './types/types';
import * as PictureApi from './api/pictureApi';
import PageButtons from './components/pageButtons';
import usePage from './hooks/usePage';
import useGetPhotos from './hooks/useGetPhotos.ts';
import useSearch from './hooks/useSearch.ts';
import './App.css';

function App({ darkMode, toggleDarkmode }: DarkModeProps ) {
  const { page , handleNextPage, handlePrevPage } = usePage(1);
  const { photosData, isLoading } = useGetPhotos(page);
  const { handleSearch } = useSearch();

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
          photosData.map((pic) => (
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
