"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import PostInfo from './components/PostInfo';
import Navbar from '@/app/utils/admin/Navbar';

export default function Page() {
  const router = useRouter();


  return (
    <div className='w-screen h-screen bg-darkgray flex flex-row items-center justify-center'>
      <div className='md:w-[10%] w-[100px] h-screen'><Navbar /></div>
      <div className='md:w-[90%] w-full h-screen'><PostInfo /></div>
      
    </div>
  );
}
