import { useLocation, useNavigate, Link } from 'react-router-dom'
import { NavBarProps } from '@/types/types'
import NavBar from '../components/nav'
import { CircleUserRound } from 'lucide-react';
import useGetCollectionPhoto from '@/hooks/useGetCollectionPhoto';
import { Blurhash } from 'react-blurhash';
import PageButtons from '@/components/pageButtons';
import usePage from '@/hooks/usePage';
import useSearchNavigate from '@/hooks/useSearchNavigate';

function collectionPage({ darkMode, toggleDarkmode }: NavBarProps) {
    const location = useLocation();
    const { page, handleNextPage, handlePrevPage } = usePage(1);
    const state = location.state;
    const { id, image, title, description, totalPhotos, user, pfp } = state;
    // const { navigatePage } = useSearchNavigate();
    const { isloading, collectionPhotos } = useGetCollectionPhoto(page, id);

    console.log(state);

    // const handleSearchAndNavigate = (newQuery: string) => {
    //     if (handleSearch) {
    //         handleSearch(newQuery);
    //         navigate(`/search/${newQuery}`);
    //     }
    // };
    
    if(!state){
        return <div>Error: No collection data available</div>; 
    }

    return (
        <div className={`relative bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            {/* <NavBar
                toggleDarkmode={toggleDarkmode}
                darkMode={darkMode}
            /> */}
            <div className='h-[82vh] flex flex-col overflow-auto items-center gap-3 px-4 py-8 bg-lightMode-background dark:bg-darkMode-colors-background dark:text-darkMode-colors-text'>
                <img src={image} alt={title} title={title} className='size-36 object-cover rounded-full'/>
                <div className='flex flex-col items-center gap-3'>
                    <h1 className='font-bold text-5xl'>{title}</h1>
                    <h2 className='flex gap-2 items-center text-xl'>{pfp? <img src={pfp} alt={user} className='rounded-full'/> : <CircleUserRound/> } {user}</h2>
                    <h3 className='text-xl'>{description}</h3>
                </div>
                <div className='w-full h-full flex flex-col '>
                    <p className='items-start'>Photos: {totalPhotos}</p>
                    <div className='flex flex-wrap justify-center gap-2'>
                        {collectionPhotos.map((pic) => 
                            isloading ? (
                                <Blurhash
                                    hash={pic.blur_hash}
                                />
                            ) : (
                                <Link
                                    to={`/photo/${pic.id}`}
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