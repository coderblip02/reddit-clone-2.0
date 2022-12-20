import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useState from "react"


import PostBox from '../components/PostBox'
import PostCard from '../components/PostCard'
import MainFeed from './mainFeed'

const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Reddit-clone</title>
      </Head>
      
     
     
   
     <MainFeed />
 

     
    
 
     
    
     
    </div>
    
  )
}

export default Home
