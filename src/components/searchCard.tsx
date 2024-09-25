import React from 'react';
import { Input } from './ui/input';
import { Topics } from '../types/types';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type SearchCardProps = {
    handleSearchData?: any[];
    handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    topicsData?: Topics[];
    darkMode?: boolean; // Add darkMode prop
};

function SearchCard({ handleSearch, topicsData, handleSearchData, darkMode }: SearchCardProps) {
    return (
        <Popover>
            <div className="w-full">
                <PopoverTrigger asChild>
                    <Input
                        placeholder="Search Photos and illustrations"
                        type="search"
                        onChange={handleSearch}
                        className={`w-full border text-lightMode-text ${darkMode ? 'dark:bg-darkMode-colors-background dark:border-darkMode-colors-text' : 'border-gray-400'} duration-200`}
                    />
                </PopoverTrigger>
            </div>
            <PopoverContent sideOffset={5} align="start" className={`${darkMode ? 'bg-darkMode-colors-background' : 'bg-lightMode-background'}`}>
                <div className="flex flex-col gap-2">
                    <h1 className={`${darkMode ? 'text-darkMode-colors-text' : 'text-lightMode-text'}`}>Topics</h1>
                    <div className='flex flex-wrap gap-2'>
                        {topicsData && topicsData.length > 0 ? (
                            topicsData.map((topic, idx) => (
                                <a key={idx} className={`flex items-center pr-3 border rounded-md hover:bg-[#c6c6c6] duration-200 ${darkMode ? 'border-darkMode-colors-text hover:bg-[#343434]' : 'border-[#afafaf]'}`}>
                                    <img
                                        src={topic.cover_photo.urls.thumb}
                                        alt={topic.title}
                                        className="h-10 w-15 rounded-md"
                                    />
                                    <p className={`ml-2 ${darkMode ? 'text-darkMode-colors-text' : 'text-lightMode-text'}`}>{topic.title}</p>
                                </a>
                            ))
                        ) : (
                            <p className={`text-${darkMode ? 'lightMode-text' : 'black'}`}>No topics available</p>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default SearchCard;
