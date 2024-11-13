import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { emailBody } from '../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavourite, removeFromFavourite } from "../app/functions/favourite"
import { XCircleIcon } from '@heroicons/react/24/outline'

function Body({ senderData }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState()
    const dispatch = useDispatch()
    const fav = useSelector(state => state.favouriteSlice)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const id = searchParams.get("id")
            if (id) {
                try {
                    // console.log(senderData)
                    const result = await emailBody.get(`/?id=${id}`)
                    setData({ message: result.data.body, name: senderData?.name, id, date: senderData?.date })

                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchData()
    }, [searchParams])

    const onFavClick = (e) => {
        e.preventDefault()
        // console.log(fav)

        fav.includes(searchParams.get("id")) ?
            dispatch(removeFromFavourite(searchParams.get("id"))) :
            dispatch(addToFavourite(searchParams.get("id")))
    }
    return (
        // flex-7
        <section className='relative hideScrollBar flex flex-row space-x-5 bg-[#fff] p-8 mt-[24px] rounded-xl max-w-[64%] h-[91.2vh] overflow-y-auto'>
            <XCircleIcon onClick={()=>navigate("/")} className='absolute left-2 top-2 w-8 cursor-pointer' />
            {data && <>
                <span className='rounded-full bg-[#e54065] text-white py-3 px-5 text-3xl leading-8 h-min'>{data?.name[0]}</span>
                <div className='flex flex-col space-y-5'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl font-bold'>{data.name}</h1>
                        <button onClick={onFavClick} className='bg-[#e54065] px-5 py-1 rounded-full text-sm text-white font-medium'>{fav.includes(searchParams.get("id")) ? "Remove as favourite" : "Mark as favourite"}</button>
                    </div>
                    <span className='font-normal'>{data.date}</span>
                    <p>
                        {data.message}
                    </p>
                </div>
            </>}
        </section>
    )
}

export default Body