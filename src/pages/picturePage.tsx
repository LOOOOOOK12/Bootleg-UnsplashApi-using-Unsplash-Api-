import { NavBarProps, PicturePageProps } from '@/types/types';
import NavBar from '../components/nav';
import { ThumbsUpIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function PicturePage({ darkMode, toggleDarkmode, handleSearch }: NavBarProps) {
    const location = useLocation();
    const navigate = useNavigate(); 
    const state = location.state as PicturePageProps | undefined;
    console.log(state);

    if (!state) {
        return <div>Error: No picture data available</div>; 
    }

    const { image, imageDescription, place, likes, color} = state;

    const handleSearchAndNavigate = (newQuery: string) => {
        if (handleSearch) {
            handleSearch(newQuery);
            navigate(`/search/${newQuery}`);
        }
    };

    return (
        <div className={`bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <NavBar
                toggleDarkmode={toggleDarkmode}
                darkMode={darkMode}
                handleSearch={handleSearchAndNavigate}
            />
            <div  className={`h-screen bg-lightMode-background dark:bg-darkMode-colors-background flex flex-col items-center justify-center px-5 py-8`}>
                <img src={image} alt={imageDescription} className='h-80 object-cover' />
                <div className='flex flex-col text-lightMode-text dark:text-darkMode-colors-text'>
                    <p>{imageDescription}</p>
                    <p>{place}</p>
                    <p><ThumbsUpIcon/>{likes}</p>
                    {color ? (<p>color: {color}</p>):""}
                </div>
            </div>
        </div>
    );
}

export default PicturePage;
