import React from 'react';
import SearchCard from './searchCard';
import { Topics } from '../types/types' 
import { Image, Moon, Sun } from 'lucide-react';

type NavProps = {
    handleSearchData?: string[];
    handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    topicData?: Topics[];
    handleDarkMode?: ()=> void;
    darkMode?: boolean;
};

function Nav({ handleSearch, topicData, handleSearchData, handleDarkMode, darkMode }: NavProps) {
    return (
        <nav className='sticky z-10 top-0 bg-lightMode-background flex items-center justify-between border border-x-0 border-t-0 border-b-gray-400 dark:bg-darkMode-colors-background dark:border-b-lightMode-background py-2 px-5 gap-5 w-full duration-200'>
            <div className='flex flex-row w-full items-center gap-2'>
                <a href="#Home">{darkMode? <Image color='#f9fafb'/>: <Image color='#040506'/>}</a>
                <div className='w-1/2'>
                    <SearchCard
                        handleSearchData={handleSearchData}
                        handleSearch={handleSearch}
                        topicsData={topicData}
                        darkMode={darkMode}
                    />
                </div>
            </div>
            <button onClick={handleDarkMode}>
                {darkMode ? <Sun color="#f9fafb" /> : <Moon color='#040506'/>}
            </button>
        </nav>
    );
}

export default Nav;
