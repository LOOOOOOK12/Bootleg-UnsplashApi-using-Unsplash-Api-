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
                        className="w-full border border-black"
                    />
                </PopoverTrigger>
            </div>
            <PopoverContent sideOffset={5} align="start">
                <div className="flex flex-col">
                    <h1>Topics</h1>
                    {topicsData && topicsData.length > 0 ? (
                        topicsData.map((topic, idx) => (
                            <div key={idx} className="flex">
                                <p className="text-black">{topic.title}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-black">No topics available</p>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default SearchCard;
