import { useState } from "react";
import * as PictureApi from '../api/pictureApi';

type pageProps = {
    url: string;
    pageNumber: number;    
}

function usePage ({pageNumber}:pageProps){
    
    const [page, setPage] = useState(1);

    const handleNextPage = async() => {
        try {
            setPage((prevCount) => {
                const newPage = prevCount + 1;
                console.log("Current page:", newPage); 
                return newPage;
            });
        } catch (error) {
            console.log(error);
        }
    }

    return {page};
}