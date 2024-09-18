import React from 'react'
import { useState } from 'react';

type navProps = {
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function nav({handleSearch}: navProps) {
    const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);

    const handleSearchModalOnClick =()=>{
        setOpenSearchModal(prevState => !prevState);
    }
    return (
        <div className='sticky top-0 flex items-center justify-center bg-slate-400  py-2 px-5 gap-5 w-full border-b-[#2e2e2e]'>
            <h1>L</h1>
            <input 
                placeholder="Search Photos and illustrations" 
                type="search" onChange={handleSearch} 
                onClick={handleSearchModalOnClick}
                className='w-1/2 border border-red-500'
            />
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