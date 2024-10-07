import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as PictureApi from '../api/pictureApi';
import { Skeleton } from '../components/ui/skeleton';
import NavBar from '../components/nav';
import { NavBarProps } from '@/types/types';

function SearchPage({ darkMode, toggleDarkmode, handleSearch }: NavBarProps) {
    const { query } = useParams<{ query: string }>();
    const [searchData, setSearchData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (query) {
                try {
                    setIsLoading(true);
                    const result = await PictureApi.searchPictures(query);
                    setSearchData(result);
                } catch (error) {
                    console.log("Error fetching search results:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchSearchResults();
    }, [query]);

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
                                imageDescription: searchPic.description,
                                place: searchPic.location ? searchPic.location.name : 'Unknown',
                            }}
                        >
                            <img
                                id={searchPic.id}
                                src={searchPic.urls.regular}
                                alt={searchPic.description || 'Image'}
                                title={searchPic.description || 'No description'}
                                className="w-full h-80 grow"
                            />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default SearchPage;
