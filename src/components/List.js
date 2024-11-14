import React, { useEffect, useState } from 'react'
import { allEmail } from '../api/axios'
import Pagination from './Pagination'
import './styles.css'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToRead } from "../app/functions/read"

function List({ passData }) {
    const [storedData, setStoredData] = useState([])
    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [totalItems, setTotalItems] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const itemsperpage = 10
    const [searchParams, setSearchParams] = useSearchParams()
    const fav = useSelector(state => state.favouriteSlice)
    const dispatch = useDispatch()
    const read = useSelector(state => state.readSlice)
    const filterPara = useSelector(state => state.filterSlice)


    const filterItems = (items) => {
        let filtereditems;
        if ((Object.values(filterPara)).includes(true)) {
            // console.log("filter")
            // fav and read/unread
            if ((filterPara.read || filterPara.unread) && filterPara.favourites) {
                // console.log("fav and read/unread")
                if (filterPara.read) {
                    filtereditems = items.filter((e) => read.includes(e.id) && fav.includes(e.id))
                } else {
                    filtereditems = items.filter((e) => !read.includes(e.id) && fav.includes(e.id))
                }
                // const ttlPage = Math.round(filterItems.length / itemsperpage)
                // setTotalPages(ttlPage + 1)
                // setCurrPage(1)
            }
            // read/unread
            else if (filterPara.read || filterPara.unread) {
                // console.log("read/unread")
                if (filterPara.read) {
                    filtereditems = items.filter((e) => read.includes(e.id))
                } else {
                    filtereditems = items.filter((e) => !read.includes(e.id))
                }
                // const ttlPage = Math.round(filterItems.length / itemsperpage)
                // setTotalPages(ttlPage + 1)
                // setCurrPage(1)
            }
            //fav
            else {
                // console.log("fav")
                filtereditems = items.filter((e) => fav.includes(e.id))
                // const ttlPage = Math.round(filterItems.length / itemsperpage)
                // setTotalPages(ttlPage + 1)
                // setCurrPage(1)
            }

        } else {
            // console.log("no filter")
            filtereditems = [...items]
            // const ttlPage = Math.round(totalItems / itemsperpage)
            // setTotalPages(ttlPage)
            // console.log(filtereditems)
        }
        return filtereditems
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await allEmail.get('/?page=1')
                const ttlPage = Math.round(result.data.total / result.data.list.length)
                setData(filterItems(result.data.list))
                setStoredData(result.data.list)
                setTotalItems(result.data.total)
                setTotalPages(ttlPage)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        // console.log(filterPara)
        console.log(currPage)
        setData(filterItems(storedData.slice((currPage - 1) * itemsperpage, itemsperpage * currPage)))
    }, [filterPara])

    const formatDate = (date) => {
        const d = new Date(date)
        const formatedDate = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
        return formatedDate
    }

    const onPreviousClick = async () => {
        if (currPage > 1) {
            try {
                setCurrPage(currPage - 1)
                setData(filterItems(storedData.slice((currPage - 2) * itemsperpage, itemsperpage * (currPage - 1))))
                // console.log(currPage - 2)
                // console.log(filterItems(storedData.slice((currPage - 2) * itemsperpage, itemsperpage * (currPage-1))))
            } catch (error) {
                console.log(error)
            }
        }
    }
    const onNextClick = async () => {
        if (currPage < totalPages) {
            if (totalItems !== storedData.length) {
                // console.log("object")
                const result = await allEmail.get(`/?page=${currPage + 1}`)
                setStoredData((pre) => [...pre, ...result.data.list])
                setData(filterItems(result.data.list))
                setCurrPage(currPage + 1)
            } else {
                // console.log(currPage)
                setData(filterItems(storedData.slice((currPage) * itemsperpage, itemsperpage * (currPage + 1))))
                setCurrPage(currPage + 1)
            }
        }
    }

    const onClick = (data) => {
        // console.log(filterPara)
        const date = formatDate(data.date)
        passData({ name: data.from.name, date })
        setSearchParams({ id: data.id })
        dispatch(addToRead(data.id))
        console.log(read)
        localStorage.setItem("read", JSON.stringify([...read, data.id]))
    }

    return (
        <>
            {/* flex-5 */}
            <aside className='hideScrollBar space-y-5 mt-5 h-[91.7vh] overflow-y-auto px-1 py-1'>
                {data.length > 0 ? data.map((data, i) =>
                    <>
                        <div onClick={() => onClick(data)} key={i} className={`flex flex-row items-start justify-start space-x-6 ${read.includes(data.id) ? "bg-[#f2f2f2]" : "bg-[#fff]"} cursor-pointer px-3 py-3 rounded-xl hover:outline hover:outline-[#e54065] hover:outline-1 transition-all`} >
                            <span className='rounded-full bg-[#e54065] text-white py-3 px-5 text-3xl leading-8 h-min'>{data?.from.name[0]}</span>
                            <div className='flex flex-col items-start space-y-2'>
                                <p>From: <strong>{data?.from.name} &lt;{data.from.email}&gt;</strong></p>
                                <p>Subject: <strong>{data?.subject}</strong></p>
                                <p>{data?.short_description}</p>
                                <p>
                                    {formatDate(data?.date)}
                                    {fav.includes(data.id) && <span className='ml-10 text-[#e54065] font-medium text-base'>Favourite</span>}
                                </p>
                            </div>
                        </div>
                    </>
                ) :
                    <>
                        <h1 className='text-3xl font-semibold text-center outline outline-[#e54065] outline-1 rounded-xl px-4 py-3'>No Data Available!</h1>
                    </>
                }

                < Pagination
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