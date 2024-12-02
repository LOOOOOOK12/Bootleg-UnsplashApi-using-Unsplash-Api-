import { useEffect, useState } from "react";
import * as PictureApi from '../api/pictureApi';

export default function useGetCollectionPhoto(page: Number = 1 , id?:any){
    const [ collectionPhotos, setCollectionPhotos ] = useState<any[]>([]);
    const [ isloading, setIsLoading ] = useState<boolean>(false);

    const fetchCollectionPhotos = async () => {
        if(!id) return;
        
        try {
            setIsLoading(true);
            const result = await PictureApi.getCollectionPhotos(page, id);
            setCollectionPhotos(result);
            console.log(result);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchCollectionPhotos();
    },[page, id]);

    return { isloading, collectionPhotos};
}