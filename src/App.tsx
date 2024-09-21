import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from './components/ui/skeleton';
import NavBar from './components/nav';
import * as PictureApi from './api/pictureApi';
import './App.css';

function App() {
  const [pictureListData, setPictureListData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    setIsLoading(false); // Stop loading once the request completes
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    listPictures();
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <NavBar handleSearch={handleSearch} />
      <div className="flex flex-wrap gap-3">
        {isLoading
          ? Array(10) 
              .fill(0)
              .map((_, idx) => (
                <Skeleton key={idx} className="h-52 w-52" /> 
              ))
          : pictureListData.map((pic) => (
              <Link
                key={pic.id}
                to={`/photo/${pic.id}`}
                state={{
                  image: pic.urls.raw,
                  imageDescription: pic.description,
                  place: pic.location.name,
                }}
              >
                <img src={pic.urls.raw} alt={pic.description} className="h-52" />
              </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
