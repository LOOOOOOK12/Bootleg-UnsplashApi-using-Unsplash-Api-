import { useState, useEffect } from 'react';
import NavBar from './components/nav';
import picturePage from './pages/picturePage';
import * as PictureApi from './api/pictureApi';
import './App.css';

function App() {
  const [pictureListData, setPictureListData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("")

  const listPictures = async () => {
    try {
      const result = await PictureApi.getPhotos();    
      setPictureListData(result);
      console.log(result)
    } catch (error) { 
      console.log(error)
    }
  }

  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value)
  }

  // useEffect(() => {
  //   listPictures();
  // }, []);

  return (
    <div>
      <NavBar handleSearch={handleSearch}/>
      <div className='max-h-screen flex flex-wrap gap-3'>
        {pictureListData.map((pic) =>(
          <div key={pic.id} className='flex flex-col gap-2'>
            <a href={pic.links.html} target='_blank'>
              <img key={pic.id} src={pic.urls.raw} alt={pic.description} className='h-52' />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
