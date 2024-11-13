import React, { useEffect, useState } from 'react'
import { allEmail } from '../api/axios'
import Pagination from './Pagination'
import './styles.css'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


function List({ passData }) {
    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [currPage, setCurrPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const fav = useSelector(state => state.favouriteSlice)

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await allEmail.get('/?page=1')
                const ttlPage = Math.round(result.data.total / result.data.list.length)
                setData(result.data.list)
                setTotalPages(ttlPage)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const formatDate = (date) => {
        const d = new Date(date)
        const formatedDate = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
        return formatedDate
    }

    const onPreviousClick = async () => {
        if (currPage > 1) {
            try {
                const result = await allEmail.get(`/?page=${currPage - 1}`)
                setCurrPage(currPage - 1)
                setData(result.data.list)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const onNextClick = async () => {
        if (currPage < totalPages) {
            const result = await allEmail.get(`/?page=${currPage + 1}`)
            setCurrPage(currPage + 1)
            setData(result.data.list)
        }
    }

    const onClick = (data) => {
        const date = formatDate(data.date)
        passData({ name: data.from.name, date })
        setSearchParams({ id: data.id })
    }

    return (
        <>
            {/* flex-5 */}
            <aside className='hideScrollBar space-y-5 mt-5 h-[91.7vh] overflow-y-auto px-1 py-1'>
                {data.map((data, i) =>
                    <div onClick={() => onClick(data)} key={i} className='flex flex-row items-start justify-start space-x-6 bg-[#ffffff] hover:bg-[#f2f2f2] cursor-pointer px-3 py-3 rounded-xl hover:outline hover:outline-[#e54065] hover:outline-1 transition-all' >
                        <span className='rounded-full bg-[#e54065] text-white py-3 px-5 text-3xl leading-8 h-min'>{data?.from.name[0]}</span>
                        <div className='flex flex-col items-start space-y-2'>
                            <p>From: <strong>{data?.from.name} &lt;{data.from.email}&gt;</strong></p>
                            <p>Subject: <strong>{data?.subject}</strong></p>
                            <p>{data?.short_description}</p>
                            <p>
                                {formatDate(data?.date)}
                                {fav.includes(data.id)&&<span className='ml-10 text-[#e54065] font-medium text-base'>Favourite</span>}
                            </p>
                        </div>
                    </div>)
                }

                <Pagination
                    onPreviousClick={onPreviousClick}
                    onNextClick={onNextClick}
                    totalPage={totalPages}
                    currentPage={currPage}
                />
            </aside>
        </>
    )
}

export default List