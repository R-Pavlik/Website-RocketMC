import Image from "next/image";
import Hero from "./components/Hero";
import Features from "./components/Features";
import BlogPosts from "./components/BlogPosts";

export default function Home() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Hero />
      <Features />
      <BlogPosts />
    </div>
  );
}
