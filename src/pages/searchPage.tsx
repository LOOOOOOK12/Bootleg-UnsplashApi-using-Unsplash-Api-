import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as PictureApi from '../api/pictureApi';
import { Skeleton } from '../components/ui/skeleton';
import NavBar from '../components/nav';
import { DarkModeProps } from '@/types/types';

function SearchPage({ darkMode, toggleDarkmode }: DarkModeProps) {
    const { query } = useParams<{ query: string }>();
    const [searchData, setSearchData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
        try {
            setIsLoading(true);
            const result = await PictureApi.searchPictures(query!);
            setSearchData(result);
            console.log(result);
        } catch (error) {
            console.log("Error fetching search results:", error);
        } finally {
            setIsLoading(false);
        }
        };

        if (query) {
        fetchSearchResults();
        }
    }, [query]);

    return (
        <div className={`flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <NavBar handleDarkMode={toggleDarkmode} darkMode={darkMode} />
            <div className={`flex flex-wrap justify-center items-center gap-3 py-8 bg-lightMode-background dark:bg-darkMode-colors-background`}>
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
                        image: searchPic.urls.raw,
                        imageDescription: searchPic.description,
                        place: searchPic.location ? searchPic.location.name : 'Unknown',
                    }}
                    >
                    <img
                        id={searchPic.id}
                        src={searchPic.urls.raw}
                        alt={searchPic.description || 'Image'}
                        title={searchPic.description || 'No description'}
                        className="h-52"
                    />
                    </Link>
                ))
                )}
            </div>
        </div>
    );
}

export default SearchPage;
