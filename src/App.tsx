import { Link } from 'react-router-dom';
import { Blurhash } from 'react-blurhash';
import NavBar from './components/nav';
import { DarkModeProps } from './types/types';
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
      <div id="Home" className="flex flex-wrap overflow-hidden justify-center gap-3 px-4 py-8 dark:bg-darkMode-colors-background duration-200" >
        {photosData.map((pic) =>
          isLoading ? (
            <Blurhash
              hash={pic.blur_hash}
              height={500}
              width={150}
              punch={1}
            />
          ):(
            <Link
              key={pic.id}
              to={`/photo/${pic.id}`}
              state={{
                image: pic.urls.regular,
                imageDescription: pic.alt_description,
                place: pic.location ? pic.location.name : 'Unknown',
                likes: pic.likes || "0",
              }}
            >
              <img
                id={pic.id}
                src={pic.urls.raw + "&w=1500&dpr=2&fit=max"}
                alt={pic.alt_description || 'Image'}
                title={pic.alt_description || 'No description'}
                className='h-80 grow'
              />
            </Link>
          ))
        }
      </div>
      <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode}/>
    </div>
  );
};

export default App;
