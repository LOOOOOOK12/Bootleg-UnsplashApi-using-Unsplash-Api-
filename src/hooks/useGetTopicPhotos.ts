import { useEffect, useState } from "react";
import * as PictureApi from "../api/pictureApi"

export default function useGetTopicPhotos(page: Number = 1, slug?:string){
    const [ topicPhotos, setTopicPhotos ] = useState<any[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const fetchTopicPhotos = async() => {
        try {
            setIsLoading(true);
            const result = await PictureApi.getTopicPhotos(page, slug);
            setTopicPhotos(result);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }
    
    useEffect(()=>{
        fetchTopicPhotos()
    },[page, slug])
    
    return { topicPhotos, isLoading }
}