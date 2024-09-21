import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './components/nav';
import * as PictureApi from './api/pictureApi';
import './App.css';

function App() {
  const [pictureListData, setPictureListData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const listPictures = async () => {
    try {
      const result = await PictureApi.getPhotos();
      setPictureListData(result);
      console.log(result);
    } catch (error) {
      console.log(error);
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
    <div>
      <NavBar handleSearch={handleSearch} />
      <div className="max-h-screen flex flex-wrap gap-3">
        {pictureListData.map((pic) => (
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
