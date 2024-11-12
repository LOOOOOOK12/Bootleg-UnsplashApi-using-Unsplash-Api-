import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as PictureApi from '../api/pictureApi';
import { NavBarProps } from '@/types/types';
import PageButtons from '@/components/pageButtons';
import usePage from '@/hooks/usePage';
import { Blurhash } from 'react-blurhash';

function SearchPage({ darkMode }: NavBarProps) {
    const { query } = useParams<{ query: string }>();
    const [searchData, setSearchData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { page, handleNextPage, handlePrevPage} = usePage(1);

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

    return (
        <div className={`flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <div className="max-h-full flex flex-wrap overflow-hidden justify-center gap-5 py-8 px-5 dark:bg-darkMode-colors-background duration-200">
                { searchData.map((searchPic) =>
                    isLoading ? (
                        <Blurhash
                            hash={searchPic.blur_hash}
                            width={300}
                            height={250}
                            punch={1}
                        />
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
                            className="w-full h-80 grow"
                        />
                    </Link>)
                )}
            </div>
            <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode}/>
        </div>
    );
}

export default SearchPage;
