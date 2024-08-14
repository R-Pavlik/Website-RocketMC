"use client";

import React, { useState } from 'react';
import { FaHome, FaListUl, FaBars, FaTimes } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { FaPhoneFlip } from "react-icons/fa6";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='w-screen h-[90px] bg-darkgray flex justify-between items-center text-white px-10 overflow-hidden'>
      <div className='flex flex-row justify-center items-center'>
        <a href="/"><img src="/rocketmc-logo.png" alt="" className='w-[90px]'/></a>
        <h1 className='kanitfont text-4xl ml-4'>RocketMC</h1>
      </div>

      {/* Hamburger menu icon */}
      <div className='block md:hidden'>
        <button onClick={toggleMenu}>
          {menuOpen ? <FaTimes className='w-[30px] h-[30px]' /> : <FaBars className='w-[30px] h-[30px]' />}
        </button>
      </div>

      {/* Menu list */}
      <ul className={`flex flex-col md:flex-row gap-4 absolute md:static top-[90px] right-0 bg-darkgray bg-opacity-70  md:bg-transparent w-full md:w-auto ${menuOpen ? 'block' : 'hidden'} md:flex z-30`}>
        <li className="text-right"><a href="/" className='kanitfont flex flex-row justify-center gap-2 p-4 md:p-0'><FaHome className='mt-1 w-[20px]'/>Home</a></li>
        <li className="text-right"><a href="/blog" className='kanitfont flex flex-row justify-center gap-2 p-4 md:p-0'><FaListUl className='mt-1 w-[20px]'/>Blog</a></li>
        <li className="text-right"><a href="/team" className='kanitfont flex flex-row justify-center gap-2 p-4 md:p-0'><IoPeople className='mt-1 w-[20px]'/>Team</a></li>
        <li className="text-right"><a href="/contact" className='kanitfont flex flex-row justify-center gap-2 p-4 md:p-0'><FaPhoneFlip className='mt-1 w-[20px]'/>Contact</a></li>
      </ul>
    </div>
  )
}
