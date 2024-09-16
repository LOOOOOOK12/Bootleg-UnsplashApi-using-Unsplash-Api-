import { useState, useEffect } from 'react';
import * as PictureApi from './api/pictureApi';
import './App.css';

function App() {
  const [pictureData, setPictureData] = useState<any>(null);

  const picture = async () => {
    try {
      const result = await PictureApi.getRandomPicture();
      if (result && result.urls) {
        setPictureData({
          imageUrl: result.urls.full || result.urls.regular,
          description: result.alt_description, 
        });
      } else {
        console.log('Unexpected result:', result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    picture();
  }, []);

  return (
    <div className='h-screen flex items-center justify-center'>
      {pictureData ? ( 
        <div className='flex flex-col gap-2'>
          <img src={pictureData.imageUrl} alt={pictureData.description} className='h-60'/>
          <h1>{pictureData.description}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
