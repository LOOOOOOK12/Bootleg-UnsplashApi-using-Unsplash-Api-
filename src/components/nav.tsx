import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from './ui/input';
import { Image, Moon, Sun } from 'lucide-react';
import { NavBarProps } from '@/types/types';
import useGetTopics from '@/hooks/useGetTopics';

function Nav({ handleSearch, toggleDarkmode, darkMode }: NavBarProps) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { topicsData } = useGetTopics();
    console.log(topicsData);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const onSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (handleSearch && searchInputRef.current) {
            const query = searchInputRef.current.value;
            if (query) {
                setSearchQuery(query);  
                handleSearch(query);   
                navigate(`/search/${query}`);  
            }
        }
    };

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.value = searchQuery;
        }
    }, [searchQuery, location]);

    return (
        <nav className='sticky z-10 top-0 bg-lightMode-background flex flex-col justify-between border border-x-0 border-t-0 border-b-gray-400 dark:bg-darkMode-colors-background dark:border-b-lightMode-background py-2 px-4 gap-2 w-full duration-200'>
            <div className='flex flex-row w-full justify-between gap-2'>
                <div className='flex w-full gap-4'>
                    <Link to={`/`}>
                        {darkMode ? <Image color='#f9fafb' /> : <Image color='#040506' className='h-full' />}
                    </Link>
                    <div className='w-1/2'>
                        <form onSubmit={onSearchSubmit}>
                            <Input
                                ref={searchInputRef}
                                placeholder="Search photos and illustrations"
                                type="search"
                                defaultValue={searchQuery} 
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
            </div>
            <div>
                <div className='flex gap-2' >
                    {topicsData?.map((topic) => (
                        <Link 
                            key={topic.slug} 
                            to={`/topics/${topic.slug}/photos`} 
                            className='border border-gray-400 rounded-sm px-4 py-2 text-lightMode-text hover:bg-gray-200 duration-200 dark:text-darkMode-colors-text'>
                            {topic.slug}
                        </Link>
                    ))}
                    <Link to={`/collections`} className='border border-gray-400 rounded-sm px-4 py-2 text-lightMode-text hover:bg-gray-200 duration-200 dark:text-darkMode-colors-text'>
                        Collections
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
