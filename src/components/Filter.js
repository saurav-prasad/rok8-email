import React from 'react'
import { useSearchParams } from 'react-router-dom'

function Filter() {
    const filterItems = [{ name: "Unread" }, { name: "Read" }, { name: "Favorites" }]
    const [searchParams, setSearchParams] = useSearchParams()
    const onClick = (e) => {

    }
    return (
        <nav className='flex space-x-2 items-center font-medium text-base'>
            <h1>Filter By:</h1>
            <div className='flex space-x-5 items-center'>
                {filterItems.map((e, i) =>
                    <p onClick={onClick} key={i} className='hover:bg-[#e1e4ea] cursor-pointer transition-all rounded-full px-4 py-1 text-center'>
                        {e.name}
                    </p>
                )}
            </div>
        </nav>
    )
}

export default Filter