import React, { useState } from 'react';
import { Input } from './ui/input';
import SearchCard from './searchCard';

type Topic = {
    id: string;
    slug: string;
    title: string;
};

type NavProps = {
    handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    topicsData?: Topic[]; // Change to Topic[]
};

function Nav({ handleSearch, topicsData }: NavProps) {
    const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);

    const handleSearchModalOnClick = () => {
        setOpenSearchModal(true);
    };

    return (
        <div className='sticky z-10 top-0 flex items-center justify-between bg-slate-400 py-2 px-5 gap-5 w-full border-b-[#2e2e2e]'>
            <h1>LOAK</h1>
            <div className='flex w-full gap-2'>
                <Input
                    placeholder="Search Photos and illustrations"
                    type="search"
                    onChange={handleSearch}
                    onClick={handleSearchModalOnClick}
                    className='w-1/2 border border-black'
                />
            </div>
            {openSearchModal && (
                <SearchCard topics={topicsData} />
            )}
        </div>
    );
}

export default Nav;
