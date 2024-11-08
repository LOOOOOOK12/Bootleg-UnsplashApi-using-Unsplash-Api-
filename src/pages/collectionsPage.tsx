import PageButtons from '@/components/pageButtons'
import { DarkModeProps } from '@/types/types';
import { Link } from 'react-router-dom';
import usePage from '@/hooks/usePage';
import useGetCollection from '@/hooks/useGetCollection';
import { Blurhash } from 'react-blurhash';

function collectionPage({darkMode}: DarkModeProps) {
    const { page, handleNextPage, handlePrevPage} = usePage(1);
    const { collectionsData, isLoading} = useGetCollection(page);

    return (
        <div className={`relative flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden justify-center gap-7 py-8 px-5 dark:bg-darkMode-colors-background duration-200">
                {collectionsData.map((collection,idx) =>
                isLoading ? (
                    <Blurhash
                        hash={collection.blur_hash}
                        width={300}
                        height={250}
                        punch={1}
                    />
                    ):(
                        <Link
                            key={idx}
                            to={`/collections/${collection.id}/photos`}
                            state={{
                                id:collection.id,
                                image: collection.cover_photo.urls.regular +"&fit=max",
                                title: collection.title,
                                description: collection.description || "No description",
                                totalPhotos: collection.total_photos,
                                user: collection.user.username,
                                pfp: collection.user.profile_image.small,
                            }}
                        >
                            <div key={collection.id} className='relative h-96 w-full '>
                                <div className='w-full h-full gap-1 grid grid-cols-2 grid-rows-2 rounded-md brightness-50 hover:brightness-75 duration-200'>
                                    <img
                                        src={collection.preview_photos[0].urls.regular +"&fit=max"}
                                        title={collection.title}
                                        className='object-cover col-span-1 row-span-1 h-full w-full rounded-xl'
                                    />
                                    <img
                                        src={collection.preview_photos[1].urls.regular +"&fit=max"}
                                        title={collection.title}
                                        className='object-cover col-span-2 row-span-1 h-full w-full rounded-xl'
                                    />
                                    <img
                                        src={collection.preview_photos[2].urls.regular +"&fit=max"}
                                        title={collection.title}
                                        className='object-cover col-span-3 row-span-2 h-full w-full rounded-xl'
                                    />
                                </div>
                                <h1 className='absolute bottom-2 right-2 text-darkMode-colors-text text-2xl text-right font-bold'>{collection.title}</h1>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode}/>
        </div>
    )
}

export default collectionPage