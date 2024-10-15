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
        <div>
            <NavBar
                darkMode = {darkMode}
                toggleDarkmode={toggleDarkmode}
            />
            <div className='flex flex-col gap-2'>
                <img src={image} alt={title} />
                <p>{description}</p>
                <p>{totalPhotos}</p>
                <p>{user}</p>
            </div>
        </div>
    )
}

export default collectionPage