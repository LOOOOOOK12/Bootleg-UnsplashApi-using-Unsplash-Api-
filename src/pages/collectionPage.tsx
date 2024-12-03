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
    const { id, image, title, description, totalPhotos, user, pfp } = state;
    const { isloading, collectionPhotos } = useGetCollectionPhoto(page, id);

    console.log(state);
    
    if(!state){
        return <div className='h-screen items-center justify-center'>Error: No collection data available</div>; 
    }

    return (
        <div className={`relative bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <div className='h-screen flex flex-col overflow-auto items-center gap-3 px-4 py-8 bg-lightMode-background dark:bg-darkMode-colors-background dark:text-darkMode-colors-text'>
                <div className="h-40 w-56 rounded-full">
                    <img src={image} alt={title} title={title} className='h-full object-cover rounded-full'/>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    <h1 className='font-bold text-5xl'>{title}</h1>
                    <h2 className='flex gap-2 items-center text-xl'>{pfp? <img src={pfp} alt={user} className='rounded-full'/> : <CircleUserRound/> } {user}</h2>
                    <h3 className='text-xl'>{description}</h3>
                </div>
                <div className='w-full h-full flex flex-col gap-3 '>
                    <h1 className='items-start font-normal'>Photos: {totalPhotos}</h1>
                    <div className='flex flex-wrap justify-center gap-2'>
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
                                    <img src={pic.urls.regular + "&auto=format&w=1080&h=300&fit=fill&auto=format"} alt=""
                                        className='object-cover'
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