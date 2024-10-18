import { useState, useEffect  } from "react";
import * as PictureApi from '../api/pictureApi'

export default function useGetPhotos( page: number = 1) {
    const [photosData, setPhotosData] = useState<any[]>([]);
    const [ error, setError] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(()=>{
        const fetchPhotos = async () =>{
            try {
                setIsLoading(true);
                const result = await PictureApi.getPhotos(page);
                setPhotosData(result);
                console.log(result);
            } catch (error) {
                setError("Error has Occured");
            }
            finally{
                setIsLoading(false);
            }
        };
        fetchPhotos();

    },[page])


    return {photosData, error, isLoading }
};