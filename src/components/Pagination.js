import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import React from 'react'

function Pagination({ onPreviousClick, onNextClick, totalPage, currentPage }) {
    return (
        <footer className='flex items-center justify-around'>
            <div onClick={onPreviousClick} className='cursor-pointer hover:bg-[#ffff] px-3 rounded-lg'>
                <ArrowLongLeftIcon className='w-8' />
            </div>
            <p className='text-xl'>Page {currentPage} of {totalPage}</p>
            <div onClick={onNextClick} className='cursor-pointer hover:bg-[#ffff] px-3 rounded-lg'>
                <ArrowLongRightIcon className='w-8 cursor-pointer hover:bg-[#ffff]' />
            </div>
        </footer>
    )
}

export default Pagination