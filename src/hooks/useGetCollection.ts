import { useState, useEffect } from "react";
import * as PictureApi from '../api/pictureApi'

export default function useGetCollection(page: number = 1){
    const [ collectionsData, setCollectionsData ] = useState<any[]>([])
    const [ isLoading, setIsLoading ] = useState(false);

    const fetchCollectionsData = async () => {
        try {
            setIsLoading(true);
            const result = await PictureApi.getCollections(page);
            setCollectionsData(result);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchCollectionsData();
    },[page]);

    return {collectionsData, isLoading}
}