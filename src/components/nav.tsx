import React from 'react'
import { useState } from 'react';
import { Input } from './ui/input';

type navProps = {
    handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function nav({handleSearch}: navProps) {
    const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);

    const handleSearchModalOnClick =()=>{
        setOpenSearchModal(prevState => !prevState);
    }
    return (
        <div className='sticky top-0 flex items-center justify-between bg-slate-400 py-2 px-5 gap-5 w-full border-b-[#2e2e2e]'>
            <div className='flex w-full gap-2'>
                <h1>L</h1>
                <Input
                    placeholder="Search Photos and illustrations" 
                    type="search" onChange={handleSearch} 
                    onClick={handleSearchModalOnClick}
                    className='w-full border border-black'
                />
            </div>
            <div>
                <h1>LOAK</h1>
            </div>
            {/*{ openSearchModal &&( 
                <div className="absolute top-12 left-0 bg-white border p-3 shadow-md">
                    <p>This is a small modal</p>
                    <button onClick={handleSearchModalOnClick}>Close</button>
                </div>
            )} */}
        </div>
    )
}

export default nav