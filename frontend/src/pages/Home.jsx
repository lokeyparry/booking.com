import React from 'react'
import Hero from "../components/Hero"
import About from '../components/About'
import Properties from '../components/Properties'
import Blogs from '../components/Blogs'
import bannerImg from "../assets/banner.png"

const Home = () => {
  return (
    <main className=''>
      <Hero />
      <About />
      <Properties />
      <Blogs />
      <div className='max-padd-container py-16 overflow-x-hidden '>
        <img src={bannerImg} alt="" />
      </div>
    </main>
  )
}

export default Home