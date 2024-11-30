import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as PictureApi from '../api/pictureApi';
import { NavBarProps } from '@/types/types';
import PageButtons from '@/components/pageButtons';
import usePage from '@/hooks/usePage';
import { Skeleton } from '@/components/ui/skeleton';
import useSearch from '@/hooks/useSearch';

function SearchPage({ darkMode }: NavBarProps) {
    const { query } = useParams<{ query: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { page, handleNextPage, handlePrevPage} = usePage(1);
    const { fetchSearchResults, searchResultsData } = useSearch();

    useEffect(() => {
            if (query) {
                try {
                    setIsLoading(true);
                    fetchSearchResults(query, page);
                } catch (error) {
                    console.log("Error fetching search results:", error);
                } finally {
                    setIsLoading(false);
                }
        };
    }, [query, page]);

    return (
        <div className={`flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <div className="max-h-full flex flex-wrap overflow-hidden justify-center gap-5 py-8 px-5 dark:bg-darkMode-colors-background duration-200">
                {searchResultsData.map((searchPic) =>
                    isLoading ? (
                        <Skeleton className='h-40 w-60'/>
                    ) : ( <Link
                        key={searchPic.id}
                        to={`/photos/${searchPic.id}`}
                        state={{
                            id: searchPic.id,
                        }}
                    >
                        <img
                            id={searchPic.id}
                            src={searchPic.urls.regular}
                            alt={searchPic.alt_description || 'Image'}
                            title={searchPic.description || 'No description'}
                            className="w-full h-80 object-cover"
                        />
                    </Link>)
                )}
            </div>
            <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode}/>
        </div>
    );
}

export default SearchPage;
