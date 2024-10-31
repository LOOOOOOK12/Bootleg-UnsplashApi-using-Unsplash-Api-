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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden justify-center gap-3 py-8 px-5 dark:bg-darkMode-colors-background duration-200">
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
                            <div key={collection.id} className='relative gap-1 grid grid-cols-2 grid-rows-2 rounded-md'>
                                <img
                                    src={collection.preview_photos[0].urls.regular + "&auto=format"}
                                    title={collection.title}
                                    className='object-cover col-span-1 row-span-1'
                                />
                                <img
                                    src={collection.preview_photos[1].urls.regular + "&auto=format"}
                                    title={collection.title}
                                    className='object-cover col-span-2 row-span-1'
                                />
                                <img
                                    src={collection.preview_photos[2].urls.regular + "&auto=format"}
                                    title={collection.title}
                                    className='object-cover col-span-2 row-span-2'
                                />
                                <div className="absolute inset-x-0 bottom-0 blur-sm w-full h-1/4 bg-black opacity-50"></div>
                                <h1 className='absolute bottom-0 right-2 text-white text-xl font-bold'>{collection.title}</h1>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode}/>
        </div>
    )
}

export default collectionPage