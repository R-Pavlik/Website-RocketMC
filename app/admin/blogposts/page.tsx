import React from 'react'
import Navbar from '@/app/utils/admin/Navbar';
import PostList from './components/PostList';
export default function page() {
    return (
        <div className='w-screen h-screen bg-darkestgray flex flex-row items-center justify-center'>
          <div className='md:w-[10%] w-[100px] h-screen'><Navbar /></div>
          <div className='md:w-[90%] w-full h-screen'><PostList/></div>
          
        </div>
      );
}
