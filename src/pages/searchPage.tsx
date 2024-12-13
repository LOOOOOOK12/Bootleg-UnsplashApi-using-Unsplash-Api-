import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Frown } from 'lucide-react';
import { NavBarProps } from '@/types/types';
import PageButtons from '@/components/pageButtons';
import usePage from '@/hooks/usePage';
import { Skeleton } from '@/components/ui/skeleton';
import useSearch from '@/hooks/useSearch';

function SearchPage({ darkMode }: NavBarProps) {
    const { query } = useParams<{ query: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { page, handleNextPage, handlePrevPage } = usePage(1);
    const { fetchSearchResults, searchResultsData } = useSearch();

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                try {
                    setIsLoading(true);
                    await fetchSearchResults(query, page);
                } catch (error) {
                    console.log("Error fetching search results:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchResults();
    }, [query, page]);

    return (
        <div className={`flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <div className="content-evenly columns-1 md:columns-3 lg:columns-4 gap-2 py-8 px-5 dark:bg-darkMode-colors-background duration-200">
                {isLoading ? (
                    Array(30).fill(0).map((_, idx) => <Skeleton key={idx} className="object-cover mb-2 h-80" />)
                ) : searchResultsData.length > 0 ? (
                    searchResultsData.map((searchPic) => (
                        <Link
                            key={searchPic.id}
                            to={`/photos/${searchPic.id}`}
                            state={{
                                image: searchPic.urls.regular,
                                title: searchPic.alt_description,
                                description: searchPic.description || 'No description',
                                place: searchPic.location ? searchPic.location.name : 'Unknown',
                                likes: searchPic.likes || '0',
                            }}
                        >
                            <img
                                src={searchPic.urls.regular}
                                alt={searchPic.alt_description || 'Image'}
                                title={searchPic.description || 'No description'}
                                className="object-cover mb-2"
                            />
                        </Link>
                    ))
                ) : (
                    <p className='h-screen w-full flex flex-col justify-center items-center gap-4'> <Frown size={50}/> No results found...</p>
                )}
            </div>
            <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode} />
        </div>
    );
}

export default SearchPage;