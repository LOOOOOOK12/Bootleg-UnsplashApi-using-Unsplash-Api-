import { NavBarProps} from '@/types/types';
import { CircleUserRound, ThumbsUpIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';


function PicturePage({ darkMode }: NavBarProps) {
    const location = useLocation();
    const state = location.state;
    console.log(state);

    if (!state) {
        return <div>Error: No picture data available</div>; 
    }

    const { image, title , description, likes, userPfp, user, forHire, camera} = state;

    return (
        <div className={`relative bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <div className={`min-h-full text-lightMode-text bg-lightMode-background dark:bg-darkMode-colors-background dark:text-darkMode-colors-text flex flex-col gap-3 px-5 py-8`}>
                <div className='flex gap-2 items-center text-sm'>
                    { userPfp ? <img src={userPfp} alt={user} className='rounded-full'/> :<CircleUserRound size={30}/>}
                    <div className='flex flex-col'>
                        { user ? <h1 className='font-semibold'>{user}</h1> :<p> No user available</p>}
                        <p className={`${forHire ? `text-green-400`:`text-red-500`}`}>{forHire? `For hire` : `Not Available`}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <img src={image} alt={title} className='h-96 object-cover' />
                    <div className='flex flex-col items-start'>
                        {title ? <p>{title}</p> : <p>No title available</p>}
                        { description ? <p>{description}</p> : <p>No description available</p>}
                        <p className='flex gap-2'><ThumbsUpIcon/>{likes}</p>
                        <p>{camera}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PicturePage;
