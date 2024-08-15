import React from 'react'
import { FaDiscord,FaInstagram  } from "react-icons/fa";
export default function Hero() {
  return (
    <div className='relative w-screen h-[480px] flex flex-col justify-center items-center'>
        <div className=' z-20 flex flex-col justify-center items-center text-center'>
        <h1 className='  text-white kanitfont text-6xl'>TEAM</h1>
        <h1 className='  text-white lexendfont text-xl'>THIS IS COMPLETE LIST OF YOUR TEAM MEMBERS</h1>

        </div>
        <img src="rocketmc-bg.png" alt="" className='absolute top-0 left-0 w-full h-full object-cover z-0'/>
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10'></div>

    </div>
  )
}
