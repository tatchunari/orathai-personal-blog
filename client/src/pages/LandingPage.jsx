import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'
import ArticleSection from '../components/ArticleSection'
import { useEffect, useState } from 'react'
import { fetchPosts } from '@/api/posts'
import { PostsContext } from '@/contexts/PostsContext'


const LandingPage = () => {
  
  return (
    <div className="flex flex-col">
      <Navbar/>
      <HeroSection/>
      <ArticleSection />
      <Footer />
    </div>
  )
}

export default LandingPage;