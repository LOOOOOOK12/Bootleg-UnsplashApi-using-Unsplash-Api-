import { useEffect, useState } from "react";
import * as PictureApi from '../api/pictureApi';

export default function useGetUser( username:any ){
    const [ userInfo, setUserInfo ] = useState<any>(null);
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

    useEffect(()=>{
        fetchUser();
    },[username]);

    return { userInfo, isLoading };
}