import { DarkModeProps } from '@/types/types';
import NavBar from '../components/nav';
import { useLocation } from 'react-router-dom';

type PicturePageProps = {
    image: string;
    imageDescription: string;
    place: string;
};

function PicturePage({ darkMode, toggleDarkmode }: DarkModeProps) {
    const location = useLocation();

    const state = location.state as PicturePageProps | undefined;

    if (!state) {
        return <div>Error: No picture data available</div>; 
    }

    const { image, imageDescription, place } = state;

    return (
        <div className={` bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark': ''}`}>
            <NavBar
                handleDarkMode={toggleDarkmode} 
                darkMode={darkMode}
            />
            <div className={`bg-lightMode-background dark:bg-darkMode-colors-background h-screen px-5`}> 
                <img src={image} alt={imageDescription} className='h-64'/>
                <div className='flex flex-col'>
                    <p className='text-lightMode-text dark:text-darkMode-colors-text'>{imageDescription}</p>
                    <p className='text-lightMode-text dark:text-darkMode-colors-text'>{place}</p>
                </div>
            </div>
        </div>
    );
}

export default PicturePage;
