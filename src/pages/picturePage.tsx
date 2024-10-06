import { NavBarProps, PicturePageProps } from '@/types/types';
import NavBar from '../components/nav';

import { useLocation, useNavigate } from 'react-router-dom';

function PicturePage({ darkMode, toggleDarkmode, handleSearch }: NavBarProps) {
    const location = useLocation();
    const navigate = useNavigate(); 
    const state = location.state as PicturePageProps | undefined;

    if (!state) {
        return <div>Error: No picture data available</div>; 
    }

    const { image, imageDescription, place } = state;

    const handleSearchAndNavigate = (newQuery: string) => {
        if (handleSearch) {
            handleSearch(newQuery); // Call handleSearch to perform the search
            navigate(`/search/${newQuery}`); // Navigate to the SearchPage
        }
    };

    return (
        <div className={` bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <NavBar
                toggleDarkmode={toggleDarkmode}
                darkMode={darkMode}
                handleSearch={handleSearchAndNavigate}
            />
            <div className={`bg-lightMode-background dark:bg-darkMode-colors-background h-screen flex flex-col items-center justify-center px-5`}>
                <img src={image} alt={imageDescription} className='h-64' />
                <div className='flex flex-col'>
                    <p className='text-lightMode-text dark:text-darkMode-colors-text'>{imageDescription}</p>
                    <p className='text-lightMode-text dark:text-darkMode-colors-text'>{place}</p>
                </div>
            </div>
        </div>
    );
}

export default PicturePage;
