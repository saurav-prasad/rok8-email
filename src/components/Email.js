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
      <main className={`${(searchParams.get("id") && data !== undefined) && "flex space-x-8"}`}>
        <List passData={passData} />
        {(searchParams.get("id") && data !== undefined) && <Body senderData={data} />}
      </main >
    </>
  )
}

export default Email