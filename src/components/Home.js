import React from 'react'
import Filter from './Filter'
import Email from './Email'

function Home() {
    return (
        <div className="bg-[#f4f5f9] min-h-screen px-1 md:px-10 py-3">
            <Filter />
            <Email />
        </div>
    )
}

export default Home