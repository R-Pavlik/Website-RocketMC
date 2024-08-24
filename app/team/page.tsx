import React from 'react'
import Hero from './components/Hero'
import TeamMembers from './components/TeamMembers'
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
export default function page() {
  return (
    <div className="w-full h-full overflow-x-hidden">
        <Navbar />
        <Hero />
        <TeamMembers />
        <Footer />
    </div>
  )
}
