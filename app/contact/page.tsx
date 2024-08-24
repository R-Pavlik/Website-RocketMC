import React from 'react'
import Contacts from "./components/Contacts"
import Hero from './components/Hero'
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
export default function page() {
  return (
    <div className="w-full h-full overflow-x-hidden">
        <Navbar/>
        <Hero/>
        <Contacts/>
        <Footer/>
    </div>
  )
}
