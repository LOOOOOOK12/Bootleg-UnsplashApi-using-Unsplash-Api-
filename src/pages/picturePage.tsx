import { NavBarProps} from '@/types/types';
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

    const { image, title , description, likes, userPfp, user, forHire} = state;

    const handleSearchAndNavigate = (newQuery: string) => {
        if (handleSearch) {
            handleSearch(newQuery);
            navigate(`/search/${newQuery}`);
        }
    };

    return (
        <div className={`relative bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <NavBar
                toggleDarkmode={toggleDarkmode}
                darkMode={darkMode}
                handleSearch={handleSearchAndNavigate}
            />
            <div className={`min-h-full text-lightMode-text bg-lightMode-background dark:bg-darkMode-colors-background dark:text-darkMode-colors-text flex flex-col gap-3 px-5 py-8`}>
                <div className='flex gap-2 items-center text-sm'>
                    <img src={userPfp} alt={user} className='rounded-full'/>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold'>{user}</h1>
                        <p className={`${forHire ? `text-green-400`:`text-red-500`}`}>{forHire? `For hire` : `Not for hire`}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <img src={image} alt={title} className='h-96 object-cover' />
                    <div className='flex flex-col items-start'>
                        <p>{title}</p>
                        <p>{description}</p>
                        <p className='flex gap-2'><ThumbsUpIcon/>{likes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PicturePage;
