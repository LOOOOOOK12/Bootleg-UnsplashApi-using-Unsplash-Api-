import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

export default function useSearch(){
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate(); 

    const handleSearch = async (value:string) => {
            try {
                navigate(`/search/${value}`);
            } catch (error) {
                console.log(error);
            }
        
    }    
    return{ handleSearch, searchQuery, setSearchQuery }
}