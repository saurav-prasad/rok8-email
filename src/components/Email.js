import React, { useEffect, useState } from 'react'
import List from './List'
import Body from './Body'
import { useSearchParams } from 'react-router-dom'

function Email() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState()
  const passData = (e) => {
    // console.log(e)
    setData({ ...e })
  }
  useEffect(() => {
    if (data === undefined) {
      setSearchParams()
    }
  }, [data])

  return (
    <>
      <main className={`${(searchParams.get("id") && data !== undefined) && "lg:flex lg:flex-row lg:space-x-8"}`}>
        <section className={`${(searchParams.get("id") && data !== undefined) && "lg:block hidden"}`}>
          <List passData={passData} />
        </section>

        <section className={`${!(searchParams.get("id") && data !== undefined) && "lg:block hidden"} w-full lg:max-w-[64%] `}>
          {(searchParams.get("id") && data !== undefined) && <Body senderData={data} />}
        </section>

      </main >
    </>
  )
}

export default Email