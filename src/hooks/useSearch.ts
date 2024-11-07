import { useState, useRef } from "react"; 
import * as PictureApi from '../api/pictureApi'
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function useSearch(){
    const [searchQuery, setSearchQuery] = useState<string>('');
    // const [ searchData, setSearchData ] = useState<any[]>([])
    const navigate = useNavigate();; 
    // const [ searchQuery, setSearchQuery] = useState<string>("");
    // const searchInputRef = useRef<HTMLInputElement>(null);
    // const navigate = useNavigate();

    const handleSearch = async (value:string) => {
        if(value.trim() === ""){
            // setSearchData([]);
            return;
        } else {

            try {
                navigate(`/search/${value}`);
                // const searchResult = await PictureApi.searchPictures(value);
                // setSearchData(searchResult);
                // console.log(searchResult)
            } catch (error) {
                console.log(error);
            }
        }
    }

    // const onSearchSubmit = (event: React.FormEvent) => {
    //     event.preventDefault();
    //     if (handleSearch && searchInputRef.current) {
    //         const query = searchInputRef.current.value;
    //         if (query) {
    //             setSearchQuery(query);  
    //             handleSearch(query);   
    //             navigate(`/search/${query}`);  
    //         }
    //     }
    // }
    
    return{ handleSearch, searchQuery, setSearchQuery }
}