import React from 'react'
import { PageButtonProps } from '@/types/types'
import { ChevronLeft, ChevronRight  } from 'lucide-react';

function pageButtons({ toggleNextPage, togglePrevPage, darkMode }:PageButtonProps) {
    return (
        <div className='fixed bottom-5 right-5 flex gap-2 z-20 '>
            <button onClick={togglePrevPage} className={`border-2 border-[#040506] rounded-sm dark:border-[#f9fafb]`} title='Previous Page'>{ darkMode ?<ChevronLeft color='#f9fafb' size={50}/> : <ChevronLeft color='#040506' size={50}/>}</button>
            <button onClick={toggleNextPage} className={`border-2 border-[#040506] rounded-sm dark:border-[#f9fafb]`} title='Next Page'>{ darkMode ?<ChevronRight color='#f9fafb' size={50}/> : <ChevronRight color='#040506' size={50}/>}</button>
        </div>
    )
}

export default pageButtons