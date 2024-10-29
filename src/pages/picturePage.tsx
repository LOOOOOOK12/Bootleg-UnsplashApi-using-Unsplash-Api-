import { NavBarProps, PicturePageProps } from '@/types/types';
import NavBar from '../components/nav';
import { ThumbsUpIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function PicturePage({ darkMode, toggleDarkmode, handleSearch }: NavBarProps) {
    const location = useLocation();
    const navigate = useNavigate(); 
    const state = location.state;
    console.log(state);

    if (!state) {
        return <div>Error: No picture data available</div>; 
    }

    const { image, title , description, place, likes, color} = state;

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
            <div  className={`h-screen bg-lightMode-background dark:bg-darkMode-colors-background flex flex-col gap-3 items-center justify-center px-5 py-8`}>
                <img src={image} alt={title} className='h-80 object-cover' />
                <div className='flex flex-col text-lightMode-text dark:text-darkMode-colors-text'>
                    <p>{title}</p>
                    <p>{description}</p>
                    <p>{place}</p>
                    <p className='flex'><ThumbsUpIcon/>{likes}</p>
                    <p>color: {color}</p>
                </div>
            </div>
        </div>
    );
}

export default PicturePage;
