import { useEffect, useState } from 'react';
import * as PictureApi from '../api/pictureApi';

export default function useGetPhoto(id?: string){
    const [photoData, setPhotoData] = useState<any>(null);

    const fetchPhoto = async () => {
        try {
            const result = await PictureApi.getPhoto(id);
            setPhotoData(result);
        } catch (error) {   
            console.log(error);
        }
    }
    useEffect(()=>{
        if (id) {
            fetchPhoto();
        }
    },[id]);

    return { photoData };
}