import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from './components/ui/skeleton';
import NavBar from './components/nav';
import * as PictureApi from './api/pictureApi';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [pictureListData, setPictureListData] = useState<any[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [topicData, setTopicData]= useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const toggleDarkmode = () =>{
      setDarkMode(!darkMode);
    }

    const listPictures = async () => {
      try {
        setIsLoading(true);
        const result = await PictureApi.getPhotos();
        setPictureListData(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      finally {
      setIsLoading(false);
      }
    };

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const value = event.target.value;
      setSearchValue(value);
    
      if (value.trim() === "") {
        setSearchData([]); // Clear search results when searchValue is empty
        return;
      }
    
      try {
        const result = await PictureApi.searchPictures(value);
        console.log(result); // Check the structure of the returned data
        if (result && Array.isArray(result.results)) {
          setSearchData(result.results); // Ensure we use result.results if it exists and is an array
        } else {
          setSearchData([]); // Fallback to an empty array
          console.error("Unexpected data structure from search API", result);
        }
      } catch (error) {
        console.log("Error while searching pictures:", error);
      }
    };
    

    const listTopics = async () => {
      try {
        const result = await PictureApi.getTopics();
        setTopicData(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      //listTopics();
      listPictures();
    }, []);

    return (
      <div className={`flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark': ''}`}>
        <NavBar
          handleSearchData={searchData}
          handleSearch={handleSearch} 
          topicData={topicData}
          handleDarkMode={toggleDarkmode}
          darkMode={darkMode}
        />
        <div id="Home" className="flex flex-wrap justify-center items-center gap-3 dark:bg-darkMode-colors-background duration-200 pt-8">
          {isLoading ? (
            Array(30)
              .fill(0)
              .map((_, idx) => (
                <Skeleton key={idx} className="h-52 w-60" /> 
              ))
          ) : searchData.length > 0 ? (
            searchData.map((pic) => (
              <Link
                key={pic.id}
                to={`/photo/${pic.id}`}
                state={{
                  image: pic.urls.raw,
                  imageDescription: pic.description,
                  place: pic.location ? pic.location.name : "Unknown", 
                }}
              >
                <img
                  id={pic.id}
                  src={pic.urls.raw}
                  alt={pic.description || "Image"} // Fallback alt text
                  title={pic.description || "No description"} // Fallback title
                  className="h-52 text-lightMode-text dark:text-darkMode-colors-text"
                />
              </Link>
            ))
          ) : pictureListData.map((pic) => (
            <Link
              key={pic.id}
              to={`/photo/${pic.id}`}
              state={{
                image: pic.urls.raw,
                imageDescription: pic.description,
                place: pic.location ? pic.location.name : "Unknown",
              }}
            >
              <img
                id={pic.id}
                src={pic.urls.raw}
                alt={pic.description || "Image"}
                title={pic.description || "No description"}
                className="h-52 text-lightMode-text dark:text-darkMode-colors-text"
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  export default App;