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
                title:pic.alt_description,
                description: pic.description || 'No description',
                place: pic.location ? pic.location.name : 'Unknown',
                likes: pic.likes || "0",
              }}
            >
              <img
                id={pic.id}
                src={pic.urls.raw + "&auto=format&w=1080&h=300&fit=fill&auto=format"}
                alt={pic.description || 'Image'}
                title={pic.alt_description || 'No description'}
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
