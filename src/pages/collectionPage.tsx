import { useLocation, useNavigate } from 'react-router-dom'
import { NavBarProps, CollectionPageProps } from '@/types/types'
import NavBar from '../components/nav'

function collectionPage({darkMode, toggleDarkmode}: NavBarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as CollectionPageProps | undefined;

    console.log(state)
    
    if(!state){
        return <div>Error: No collection data available</div>; 
    }

    const {image, title, description, totalPhotos, user} = state;

    return (
        <div className={`bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <NavBar
                darkMode = {darkMode}
                toggleDarkmode={toggleDarkmode}
            />
            <div className='flex flex-col justify-center h-screen items-center gap-2 dark:bg-darkMode-colors-background dark:text-darkMode-colors-text'>
                <img src={image} alt={title} className='h-80 w-60' />
                <p>Title: {title}</p>
                <p>Description: {description}</p>
                <p>Total photos: {totalPhotos}</p>
                <p>Username: {user}</p>
            </div>
        </div>
    )
}

export default collectionPage