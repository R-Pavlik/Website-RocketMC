import React from 'react'
import { FaDiscord,FaInstagram  } from "react-icons/fa";
export default function Hero() {
  return (
    <div className='relative w-screen h-[480px] flex flex-col justify-center items-center'>
        <div className=' z-20 flex flex-col justify-center items-center text-center'>
        <h1 className='  text-white kanitfont text-6xl'>RocketMC Network</h1>


          <div className=' w-screen flex md:flex-row flex-col gap-4 justify-center items-center mt-6 '>
          <a href="https://discord.gg/C3BK7pTeNw" className='w-[250px] h-[40px] bg-discord-blue px-2 py-7 rounded-lg flex flex-row justify-center items-center gap-2 text-white font-bold kanitfont text-xl'> 
          <FaDiscord className=' w-10 h-10' /> DISCORD SERVER
          </a>
          <a href="http://" className='w-[250px] h-[40px] bg-instagram-pink px-2 py-7 rounded-lg flex flex-row justify-center items-center gap-2 text-white font-bold kanitfont text-xl'> 
          <FaInstagram className=' w-10 h-10' /> INSTAGRAM
          </a>
          </div>
        </div>
        <img src="rocketmc-bg.png" alt="" className='absolute top-0 left-0 w-full h-full object-cover z-0'/>
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10'></div>

    </div>
  )
}
