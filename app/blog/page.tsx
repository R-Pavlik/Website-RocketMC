import Image from "next/image";
import Hero from "./components/Hero";
import BlogList from "./components/BlogList"
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
export default function Home() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <BlogList />
      <Footer />

    </div>
  );
}
