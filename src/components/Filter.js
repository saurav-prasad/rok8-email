import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUnread, setRead, setFavourite } from "../app/functions/filter"
import { useSearchParams } from 'react-router-dom'

function Filter() {
    const filterItems = [{ name: "unread" }, { name: "read" }, { name: "favourites" }]
    const dispatch = useDispatch()
    const filterPara = useSelector(state => state.filterSlice)
    const [searchParams, setSearchParams] = useSearchParams()

    const onClick = (name) => {
        if (name === "read") {
            dispatch(setRead(!filterPara.read))
        } else if (name === "unread") {
            dispatch(setUnread(!filterPara.unread))
        } else {
            dispatch(setFavourite(!filterPara.favourites))
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <nav className={`${(searchParams.get("id")) ? "lg:flex hidden" : "flex"} space-x-1 sm:space-x-2 items-center font-medium text-base`}>
            <h1>Filter By:</h1>
            <div className='flex space-x-5 items-center'>
                {filterItems.map((e, i) =>
                    <p onClick={() => onClick(e.name)} key={i} className={`${filterPara[e.name] && "bg-[#e1e4ea]"} cursor-pointer transition-all rounded-full px-2 sm:px-4 py-1 text-center`}>
                        {capitalizeFirstLetter(e.name)}
                    </p>
                )}
            </div>
        </nav>
    )
}

export default Filter