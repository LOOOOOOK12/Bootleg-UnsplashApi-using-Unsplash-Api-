import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import * as PictureApi from '../api/pictureApi';

export default function useSearch(){
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [ searchResultsData, setSearchResultsData ] = useState<any[]>([]);
    const navigate = useNavigate(); 

    const handleSearch = async (value:string) => {
            try {
                navigate(`/search/${value}`);
            } catch (error) {
                console.log(error);
            }
    }
    
    const fetchSearchResults = async (query:string, page?: Number) => {
        try {
            const result = await PictureApi.searchPictures(query,page);
            setSearchResultsData(result);
        } catch (error) {
            console.log("Error fetching search results:", error);
        }
    }

    return{ handleSearch, searchQuery, setSearchQuery, fetchSearchResults, searchResultsData };
}