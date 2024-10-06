import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Image, Moon, Sun } from 'lucide-react';
import { NavBarProps } from '@/types/types';

function Nav({ handleSearch, toggleDarkmode, darkMode }: NavBarProps) {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (handleSearch && searchInputRef.current) {
            const searchQuery = searchInputRef.current.value;
            if (searchQuery) {
                handleSearch(searchQuery);  // Ensure handleSearch is defined
                navigate(`/search/${searchQuery}`);
            }
        }
    };

    return (
        <nav className='sticky z-10 top-0 bg-lightMode-background flex items-center justify-between border border-x-0 border-t-0 border-b-gray-400 dark:bg-darkMode-colors-background dark:border-b-lightMode-background py-2 px-5 gap-5 w-full duration-200'>
            <div className='flex flex-row w-full items-center gap-2'>
                <Link to={`/`}>
                    {darkMode ? <Image color='#f9fafb' /> : <Image color='#040506' className='h-full' />}
                </Link>
                <div className='w-1/2'>
                    <form onSubmit={onSearchSubmit}>
                        <Input
                            ref={searchInputRef}
                            placeholder="Search photos and illustrations"
                            type="search"
                            className={`w-full border ${darkMode
                                ? 'dark:bg-darkMode-colors-background dark:text-darkMode-colors-text dark:border-darkMode-colors-text'
                                : 'border-gray-400'} duration-200`}
                        />
                    </form>
                </div>
            </div>
            <button onClick={toggleDarkmode}>
                {darkMode ? <Sun color="#f9fafb" /> : <Moon color='#040506' />}
            </button>
        </nav>
    );
}

export default Nav;
