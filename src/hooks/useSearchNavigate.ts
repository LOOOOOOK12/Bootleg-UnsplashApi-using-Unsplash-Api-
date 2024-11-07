import { useNavigate } from "react-router-dom";
import useSearch from "./useSearch";

export default function useSearchNavigate(){
    
    const navigatePage = async (newQuery: string) => {
        const navigate = useNavigate();
        const {handleSearch} = useSearch();
    
        if (handleSearch) {
            handleSearch(newQuery);
            navigate(`/search/${newQuery}`);
        }
    }

    return { navigatePage };
}