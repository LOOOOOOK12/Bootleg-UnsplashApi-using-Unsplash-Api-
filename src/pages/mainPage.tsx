import React from 'react'
import { PictureProps, DarkModeProps } from '@/types/types';
import PageButtons from '@/components/pageButtons';
import usePage from '@/hooks/usePage';
import NavBar from '../components/nav'
import { Link } from 'react-router-dom';
import useSearch from '@/hooks/useSearch';
import { Skeleton } from '@/components/ui/skeleton';


function mainPage({  picturePageData ,isLoading, routes }:PictureProps, {darkMode, toggleDarkmode}:DarkModeProps) {
    const { handleNextPage, handlePrevPage } = usePage(1);
    const { handleSearch } = useSearch();

    return (
        <div className={`relative flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <NavBar toggleDarkmode={toggleDarkmode} handleSearch={handleSearch}/>
                <div className="max-h-* flex flex-wrap overflow-hidden justify-center gap-3 px-4 py-8 dark:bg-darkMode-colors-background duration-200">
                    {isLoading ? (
                        Array(30)
                            .fill(0)
                            .map((_,idx) =>(
                                <Skeleton key={idx} className='h-52 w-60'/>
                            ))
                    ) : (
                        picturePageData.map((pic) => (
                            <Link
                            key={pic.id}
                            to={`/${routes}/${pic.id}`}
                            state={{
                            }}
                            >
                                <img 
                                    className='w-full h-80 grow'
                                />
                            </Link>
                        ))
                    )}
                </div>
            <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode}/>
        </div>
    )
}

export default mainPage