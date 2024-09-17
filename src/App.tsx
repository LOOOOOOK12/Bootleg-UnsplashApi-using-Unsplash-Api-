import { useState, useEffect } from 'react';
import * as PictureApi from './api/pictureApi';
import './App.css';

function App() {
  // const [pictureData, setPictureData] = useState<any>(null);
  const [pictureListData, setPictureListData] = useState<any[]>([]);

  const listPictures = async () => {
    try {
      const result = await PictureApi.getPhotos();    
      setPictureListData(result);
    } catch (error) { 
      console.log(error)
    }
  }

  useEffect(() => {
    listPictures();
  }, []);

  return (
    <div className='flex flex-wrap gap-3'>
      {pictureListData.map((pic) =>(
        <div key={pic.id} className='flex flex-col gap-2'>
          <img key={pic.id} src={pic.urls.raw} alt={pic.description} className='h-52' />
          <h1>{pic.description}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
