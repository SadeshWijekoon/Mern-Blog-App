import React, { useContext, useEffect, useState } from 'react'
import HomePorts from '../components/HomePorts'
import Navbar from '../components/Navigation'
import Footer from '../components/Footer'
import { URL } from '../url'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import Loader from "../components/Loader"
import { UserContext } from '../conetxt/UserContext'

function Home() {

  const {search}=useLocation()
  const[posts,setPosts] = useState([])
  const[noResults,setNoResults]=useState(false)
  const[loader,setLoader]=useState(false)
  const {user} = useContext(UserContext)
  console.log(user)

  const fetchPosts = async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/posts"+search)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
    }catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()
  },[search])


  return (
    <>
    <Navbar/>
    <div className='px-8 ms:px-[200px] min-h-[80vh]'>
      {loader? <div className='h-[40vh] flex justify-center items-center'><Loader/></div> : !noResults?posts.map((post)=>(
        <>
        <Link to={user? `/posts/post/${post._id}`:"/login"}>
          <HomePorts key={post._id} post={post}/>
        </Link>
        </>

      )
        
      ):<h3 className='text-center font-bold mt-16'>No posts available0</h3>}
    
    </div>
    <Footer/>
    </>

  )
}

export default Home