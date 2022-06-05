import { NextPage } from 'next'
import React from 'react'
import Image from 'next/image'

const NewPlaylist: NextPage = () => {
  return (
    <>
      <div className="hero min-h-screen bg-[#ffdcaa] items-start p-8">
      
        <div className="hero-content text-center">
          <div className="max-w-md space-y-8">
            <Image src={'/assets/header-4.png'} alt='Logo saying Food Playlist' width={855} height={124} />
         
            <div className="flex flex-col space-y-4">
              {/* <button className='self-end btn btn-block md:w-16 bg-[#d9c6f1] border-none hover:text-[#c79ffa] text-[#8b6faf] font-bold'>Add</button> */}
              {/* <label htmlFor="create-playlist-modal" className='btn btn-outline text-black font-bold rounded-none border-4 hover:bg-black hover:text-white hover:border-black hover:drop-shadow-[4px_4px] transition-all ease-in-out duration-200'>Add New</label> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewPlaylist
