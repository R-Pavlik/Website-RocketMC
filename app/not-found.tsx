import Link from 'next/link'
import React from 'react'
import { FaHome } from 'react-icons/fa'
export default function Page() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-darkgray">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-white">404 - Page not found</h1>
                <p className="text-xl text-white">Sorry, we couldn't find the page you were looking for..</p>
                <a href="/" className='w-[180px] h-[50px] mt-6 bg-info px-2 py-5 rounded-lg flex flex-row justify-center items-center gap-2 text-white font-bold kanitfont text-xl'> 
                <FaHome className=' w-10 h-10' /> HOME PAGE
                </a>
            </div>
        </div>
    )
}