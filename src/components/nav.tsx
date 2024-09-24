import React from 'react';
import SearchCard from './searchCard';
import { Topics } from '../types/types' 
import { Image } from 'lucide-react';
type NavProps = {
    handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    topicData: Topics[]; 
};

function Nav({ handleSearch, topicData }: NavProps) {
    return (
        <div className='sticky z-10 top-0 flex items-center border border-b-gray-400 bg-lightMode-background py-2 px-5 gap-5 w-full'>
            <Image/>
            <div className='w-1/2'>
                <SearchCard
                    handleSearch={handleSearch}
                    topicsData={topicData}
                />
            </div>
        </div>
    );
}

export default Nav;
