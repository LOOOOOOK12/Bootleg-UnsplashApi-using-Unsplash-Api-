import { useState, useEffect } from "react"; 
import * as PictureApi from '../api/pictureApi'


export default function useSearch(){
    const [ searchData, setSearchData ] = useState<any[]>([]); 

    const handleSearch = async (value:string) => {
        if(value.trim() === ""){
            setSearchData([]);
            return;
        } else {
            try {
                const searchResult = await PictureApi.searchPictures(value);
                setSearchData(searchResult);
                console.log(searchResult)
            } catch (error) {
                console.log(error);
            }
        }
    }   

    return{ handleSearch, searchData}
}