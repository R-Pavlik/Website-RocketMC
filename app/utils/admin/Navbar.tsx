"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { FaHome,FaListUl } from 'react-icons/fa'
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { auth } from '../../api/firebaseConfig';
import { signOut } from 'firebase/auth';
import packagesource from '../../../package.json'
const version = packagesource.version
export default function Navbar() {
    const router = useRouter()
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem('isAuthenticated', 'false');
        router.push('/admin/auth');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div className='w-full h-full bg-darkgray flex flex-col justify-start items-center '>
        <img src="/rocketmc-logo.png" alt="" className=' w-full'/>
        <ul className='flex flex-col gap-2 md:p-2'>
            <a href="/admin/overview"><li className='md:w-[70px] w-[70px] md:h-[70px] h-[70px] bg-darkergray flex justify-center items-center rounded-md'><FaHome className='w-[80px] h-[45px] text-white'/> </li></a>
            <a href="/admin/blogposts"><li className='md:w-[70px] w-[70px] md:h-[70px] h-[70px] bg-darkergray flex justify-center items-center rounded-md'><FaListUl className='w-[80px] h-[45px] text-white'/> </li></a>
            <a href="/admin/settings"><li className='md:w-[70px] w-[70px] md:h-[70px] h-[70px] bg-darkergray flex justify-center items-center rounded-md'><IoSettingsSharp className='w-[80px] h-[45px] text-white'/> </li></a>
            <a href="/admin/auth" onClick={handleLogout}><li className='md:w-[70px] w-[70px] md:h-[70px] h-[70px] bg-darkergray flex justify-center items-center rounded-md'><MdOutlineLogout className='w-[80px] h-[45px] text-white'/> </li></a>
        </ul>
        <div className='w-full h-[60px] mt-40 flex flex-col justify-center md:items-center items-center text-center'>
        <h1 className='text-white lexendfont md:text-md text-sm'>Web Version: {version}</h1>
        <h1 className='text-white kanitfont text-2xs'>Made by <a href="https://github.com/R-Pavlik/">Richard Pavlík</a> with ❤️</h1>
        </div>
    </div>
  )
}
