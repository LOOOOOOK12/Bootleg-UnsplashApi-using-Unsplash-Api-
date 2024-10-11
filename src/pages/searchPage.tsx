import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as PictureApi from '../api/pictureApi';
import { Skeleton } from '../components/ui/skeleton';
import NavBar from '../components/nav';
import { NavBarProps } from '@/types/types';
import PageButtons from '@/components/pageButtons';

function SearchPage({ darkMode, toggleDarkmode, handleSearch }: NavBarProps) {
    const { query } = useParams<{ query: string }>();
    const [searchData, setSearchData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (query) {
                try {
                    setIsLoading(true);
                    const result = await PictureApi.searchPictures(query, page);
                    setSearchData(result);
                } catch (error) {
                    console.log("Error fetching search results:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchSearchResults();
    }, [query, page]);

    const handleNextPage = async () => {
            try {
            setPage((prevCount) => {
                const newPage = prevCount + 1;
                console.log("Current page:", newPage); 
                return newPage;
            });
            } catch (error) {
            console.log(error)
            }
        }
        
        const handlePrevPage = async () => {
            try {
            setPage((prevCount) => {
                const newPage = prevCount > 1 ? prevCount - 1 : 1;
                console.log("Current page:", newPage); 
                return newPage;
            });
            } catch (error) {
            console.log(error)
            }
        }

    const handleSearchAndnavigate = (newQuery: string) => {
        if(handleSearch) {
            handleSearch(newQuery);
            navigate(`/search/${newQuery}`);
        }
    }

    return (
        <div className={`flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <NavBar 
                toggleDarkmode={toggleDarkmode} 
                darkMode={darkMode} 
                handleSearch={handleSearchAndnavigate} 
            />
            <div className="max-h-full flex flex-wrap overflow-hidden justify-center gap-5 py-8 px-5 dark:bg-darkMode-colors-background duration-200">
                {isLoading ? (
                    Array(30)
                        .fill(0)
                        .map((_, idx) => <Skeleton key={idx} className="h-52 w-60" />)
                ) : (
                    searchData.map((searchPic) => (
                        <Link
                            key={searchPic.id}
                            to={`/photo/${searchPic.id}`}
                            state={{
                                image: searchPic.urls.regular,
                                imageDescription: searchPic.alt_description,
                                place: searchPic.location ? searchPic.location.name : 'Unknown',
                                color: searchPic.color,
                            }}
                        >
                            <img
                                id={searchPic.id}
                                src={searchPic.urls.regular}
                                alt={searchPic.alt_description || 'Image'}
                                title={searchPic.description || 'No description'}
                                className="w-full h-80 grow"
                            />
                        </Link>
                    ))
                )}
            </div>
            <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode}/>
        </div>
    );
}

export default SearchPage;
