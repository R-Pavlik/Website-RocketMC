import Image from "next/image";
import Hero from "./components/Hero";
import BlogList from "./components/BlogList"
export default function Home() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Hero />
      <BlogList />
    </div>
  );
}
