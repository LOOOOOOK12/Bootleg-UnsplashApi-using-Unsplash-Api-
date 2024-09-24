import React from 'react';
import { Input } from './ui/input';
import { Topics } from '../types/types';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type SearchCardProps = {
    handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    topicsData?: Topics[];
};

function SearchCard({ handleSearch, topicsData }: SearchCardProps) {
    return (
        <Popover>
            <div className="w-full">
                <PopoverTrigger asChild>
                    <Input
                        placeholder="Search Photos and illustrations"
                        type="search"
                        onChange={handleSearch}
                        className="w-full border border-gray-400"
                    />
                </PopoverTrigger>
            </div>
            <PopoverContent sideOffset={5} align="start">
                <div className="flex flex-col gap-2">
                    <h1>Topics</h1>
                    <div className=' flex flex-wrap gap-2'>
                        {topicsData && topicsData.length > 0 ? (
                            topicsData.map((topic, idx) => (
                                <a key={idx} className="flex items-center pr-3 border border-black rounded-md">
                                        <img
                                            src={topic.cover_photo.urls.thumb}
                                            alt={topic.title}
                                            className="h-10 w-15 rounded-md"
                                        />
                                    <p className="text-black ml-2">{topic.title}</p>
                                </a>
                            ))
                        ) : (
                            <p className="text-black">No topics available</p>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default SearchCard;
