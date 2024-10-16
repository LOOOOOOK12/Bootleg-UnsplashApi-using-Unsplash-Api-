import { useState } from "react";

export default function usePage (initialPage = 1){
    
    const [page, setPage] = useState(initialPage);

    const handleNextPage = async() => {
        try {
            setPage((prevCount) => {
                const newPage = prevCount + 1;
                console.log("Current Page:", newPage); 
                return newPage;
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handlePrevPage = async() => {
        try {
            try {
                setPage((prevCount) => {
                    const newPage = prevCount > 1 ? prevCount - 1 : 1;
                    console.log("Current page:", newPage); 
                    return newPage;
                });
            } catch (error) {
                console.log(error)
            } 
        } catch (error) {
            console.log(error);
        }
    }

    return {page, handleNextPage, handlePrevPage};
}
