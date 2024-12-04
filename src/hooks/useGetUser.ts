import { useEffect, useState } from "react";
import * as PictureApi from '../api/pictureApi';

export default function useGetUser( username:any ){
    const [ userInfo, setUserInfo ] = useState<any>(null);
    const [ userPhotos, setUserPhotos] = useState<any[]>([]);
    const [ userCollections, setUserCollections ] = useState<any[]>([]);
    const [ userLikedPhotos, setUserLikedPhotos ] = useState<any[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const fetchUser = async () => {
        try {
            const result = await PictureApi.getUser(username);
            setUserInfo(result);
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false);
        }
    }

    const fetchUserPhotos = async (username:string) => {
        try {
            const result = await PictureApi.getUserPhotos(username);
            setUserPhotos(result);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUserColections = async (username: string) => {
        try {
            const result = await PictureApi.getUserCollections(username);
            setUserCollections(result);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUserLikedPhotos = async (username: string) => {
        try {
            const result = await PictureApi.getUserLikedPhotos(username);
            setUserLikedPhotos(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchUser();
        fetchUserPhotos(username);
        fetchUserColections(username);
        fetchUserLikedPhotos(username);
    },[username]);

    return { userInfo, isLoading, userPhotos, userCollections, userLikedPhotos };
}