import Image from "next/image";
import Hero from "./components/Hero";
import Features from "./components/Features";
import BlogPosts from "./components/BlogPosts";
import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";

export default function Home() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <BlogPosts />
      <Footer />
    </div>
  );
}
