import React, { useContext, useState } from 'react'
import Searchbar from '../components/Searchbar'
// import { PROPERTIES } from '../constant/data'

import Item from '../components/Item'
import useProperties from '../hooks/useProperties'
import { PuffLoader } from "react-spinners"
import UserDetailContext from '../context/userDetailContext'
// import useProperties from '../hooks/useProperties.jsx'

const Favourites = () => {
  const {data, isError, isLoading} = useProperties()
  const [filter, setFilter] = useState("")
  const {userDetails:{favourites}}=useContext(UserDetailContext)
  if (isError) {
    <div>
      <span>
        Error while fetching data
      </span>
    </div>
  }
  if (isLoading) {
    return(
      <div className='h-64 flexCenter'>
        <PuffLoader 
        height="80"
        width="80"
        radius={1}
        color='#555'
        aria-label='puff-loading' />
      </div>
    )
  }
  
  return (
    <main className='max-padd-container my-[99px]'>
      <div className='max-padd-container py-10 xl:py-22 bg-primary rounded-3xl'>
        <div>
          <Searchbar filter={filter} setFilter={setFilter} />
          {/* container */}
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:gc3 mt-10'>
          { 
          data.filter((property)=>favourites.includes(property.id)).filter((property)=>
            property.title.toLowerCase().includes(filter.toLowerCase()) ||
          property.city.toLowerCase().includes(filter.toLowerCase())||
          property.country.toLowerCase().includes(filter.toLowerCase())
        ).map((property)=>(<Item key={property.title} property={property}/>
          ))}
            {/* // PROPERTIES.map((property)=>(
            //   data.map((property)=>(
            {/* //   <Item key={property.title} property={property}/>
            // ))} */} 
          </div>
        </div>
      </div>
    </main>
  )
}

export default Favourites