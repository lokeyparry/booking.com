import React from 'react'
import { Link } from 'react-router-dom'
import { VscSettings } from 'react-icons/vsc'
import { Swiper, SwiperSlide } from 'swiper/react'
import {Autoplay} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { PROPERTIES } from '../constant/data'
import Item from './Item'
import { PuffLoader } from 'react-spinners'
import useProperties from '../hooks/useProperties'


const Properties = () => {
    const {data, isError, isLoading} = useProperties()
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
    <section className='max-padd-container'>
        <div className='max-padd-container bg-primary py-16 xl:py-28 rounded-3xl'>
            <span className="medium-18">Your Futur Home Awaits!</span>
            <h2 className='h2'>Find Your Dream Here</h2>
            <div className='flexBetween mt-8 mb-6'>
                <h5><span className='font-bold'>Showing 1-9</span>Out of 3K properties.</h5>
                <Link  to={'/'} className='bg-white text-3xl rounded-md h-10 w-10 p-2 border'>
                <VscSettings />
                </Link>
            </div>
            {/* container */}
            <Swiper autoplay={{
                delay:4000,
                disableOnInteraction:false,
            }}
            breakpoints={{
                600: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1124: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1300: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }}
            modules={[Autoplay]}
            className='h-[488px] md:h-[533px] xl:h-[422px] mt-5'
            >{
                // PROPERTIES.map((property)=>(
                    data.slice(0,6).map((property)=>(
                    <SwiperSlide key={property.title}>
                        <Item property={property}/>
                    </SwiperSlide>
                ))
            }
            </Swiper>
        </div>
    </section>
  )
}

export default Properties