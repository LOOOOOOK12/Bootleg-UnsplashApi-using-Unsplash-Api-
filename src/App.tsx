import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from './components/ui/skeleton';
import NavBar from './components/nav';
import * as PictureApi from './api/pictureApi';
import './App.css';

function App() {
  const [pictureListData, setPictureListData] = useState<any[]>([]);
  const [searchPictureData, setSearchPictureData] = useState<any[]>([]);
  const [topicData, setTopicData]= useState<any[]>([]);
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
    setIsLoading(false);
    }
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    try {
      setSearchValue(event.target.value);
      const result = await PictureApi.searchPictures(searchValue)
      setSearchPictureData(result);
    } catch (error) {
      console.log(error)
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
    listTopics();
    listPictures();
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <NavBar 
        handleSearch={handleSearch} 
        topicsData={topicData}
      />
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
