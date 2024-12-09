import { useLocation, Link } from 'react-router-dom'
import { NavBarProps } from '@/types/types'
import { CircleUserRound } from 'lucide-react';
import useGetCollectionPhoto from '@/hooks/useGetCollectionPhoto';
import PageButtons from '@/components/pageButtons';
import usePage from '@/hooks/usePage';
import { Skeleton } from '@/components/ui/skeleton';

function collectionPage({ darkMode }: NavBarProps) {
    const location = useLocation();
    const { page, handleNextPage, handlePrevPage } = usePage(1);
    const state = location.state;
    const { id, image, title, description, totalPhotos, username, pfp } = state;
    const { isloading, collectionPhotos } = useGetCollectionPhoto(page, id);
    
    if(!state){
        return <div className='h-screen items-center justify-center'>Error: No collection data available</div>; 
    }

    return (
        <div className={`relative bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <div className={`${collectionPhotos ? "w-full flex flex-col items-center gap-3 px-4 py-8 bg-lightMode-background dark:bg-darkMode-colors-background dark:text-darkMode-colors-text" : "h-screen"}`}>
                    <img src={image} alt={title} title={title} className='h-40 w-56 rounded-full object-cover'/>
                <div className='flex flex-col items-center gap-3'>
                    <h1 className='font-bold text-5xl'>{title}</h1>
                    <Link 
                        to={`/users/${username}`}>
                        <h2 className='flex gap-2 items-center text-xl'>{pfp? <img src={pfp} alt={username} className='rounded-full'/> : <CircleUserRound/> } {username}</h2>
                    </Link>
                    <h3 className='text-xl'>{description}</h3>
                </div>
                <div className='w-full h-full flex flex-col gap-3'>
                    <h1 className='items-start font-normal'>Photos: {totalPhotos}</h1>
                    <div className='gap-2 p-3 content-evenly columns-1 md:columns-3 lg:columns-4'>
                        {collectionPhotos.map((pic) => 
                            isloading ? (
                                <Skeleton className='w-64 h-80'/>
                            ) : (
                                <Link
                                    to={`/photos/${pic.id}`}
                                    state={{
                                        image:pic.urls.regular,
                                    }}
                                    >
                                    <img src={pic.urls.regular + "&auto=format"} alt=""
                                        className='object-cover mb-2'
                                    />
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
            <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode}/>
        </div>
    )
}

export default collectionPage