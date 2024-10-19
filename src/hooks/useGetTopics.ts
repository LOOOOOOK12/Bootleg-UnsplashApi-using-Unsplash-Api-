import { useState, useEffect } from "react";
import * as PictureApi from '../api/pictureApi'

export default function useGetTopics(page: Number = 1){
    const [ topicsData, setTopicsData ] = useState<any[]>([]);
    const [ error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchTopics = async () =>{
            try {
                const result = await PictureApi.getTopics()
                setTopicsData(result);
            } catch (error) {
                setError("Error has occured:");
            } 
        };
        fetchTopics();
    },[page]);

    return { topicsData, error };
}