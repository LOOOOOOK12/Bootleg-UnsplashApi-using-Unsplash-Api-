import PageButtons from '@/components/pageButtons'
import { Skeleton } from '@/components/ui/skeleton';
import { DarkModeProps } from '@/types/types';
import NavBar from '../components/nav';
import { Link } from 'react-router-dom';
import usePage from '@/hooks/usePage';
import useSearch from '@/hooks/useSearch.ts';
import useGetCollection from '@/hooks/useGetCollection';

function collectionPage({darkMode, toggleDarkmode}: DarkModeProps) {
    const { page, handleNextPage, handlePrevPage} = usePage(1);
    const { collectionsData, isLoading} = useGetCollection(page);
    const { handleSearch } = useSearch();

    return (
        <div className={`relative flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <NavBar toggleDarkmode={toggleDarkmode} darkMode={darkMode} handleSearch={handleSearch}/>
            <div className="max-h-full flex flex-wrap overflow-hidden justify-center gap-3 py-8 px-5 dark:bg-darkMode-colors-background duration-200">
                {isLoading ? (
                    Array(30)
                        .fill(0)
                        .map((_, idx) => (
                            <Skeleton key={idx}/>
                        ))
                ) : (
                    collectionsData.map((collection) => (
                        <Link
                            key={collection.id}
                            to={`/collection/${collection.id}`}
                            state={{
                                image: collection.cover_photo.urls.regular +"&fit=max",
                                title: collection.title,
                                description: collection.description || "No description",
                                totalPhotos: collection.total_photos,
                                user: collection.user.username
                            }}
                        >
                            <img
                                id={collection.id}
                                src={collection.cover_photo.urls.regular}
                                title={collection.title}
                                className='w-full h-80 grow'
                            />
                        </Link>
                    ))
                )}
            </div>
            <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode}/>
        </div>
    )
}

export default collectionPage