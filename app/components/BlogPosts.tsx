"use client";  // Označí komponentu jako Client Component

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Importujte konfiguraci Firebase z externího souboru
import {db} from "../api/firebaseConfig";

import Loader from '../utils/Loader';

interface BlogPosts {
  banner: string;
  title: string;
  description: string;
}

export default function BlogPostsComponent() {
  const [blogposts, setBlogposts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const posts = querySnapshot.docs.map((doc) => doc.data() as BlogPosts);
      setBlogposts(posts.slice(-2));  // Vyberte poslední dva příspěvky
      setLoading(false);
    };
    

    fetchBlogPosts();
  }, []);
  if (loading) return <Loader />
  return (
    <div className="w-screen h-full bg-darkgray">
      <div className="w-screen h-[90px] flex justify-center items-start">
        <h1 className="kanitfont text-4xl text-white">Blog Posts</h1>
      </div>
      <div className="w-screen md:h-[920px] h-full flex flex-col-reverse justify-end items-center p-2 gap-6">
        {blogposts.map((blogpost, index) => (
          <div key={index + 1} className='md:w-[1200px] w-[95%] h-[440px] bg-darkergray rounded-2xl'>
            <div className='w-full h-[200px]'>
              <img 
                src={blogpost.banner} 
                alt={blogpost.title} 
                className='w-full h-full object-cover rounded-t-2xl' 
              />
            </div>
            <div className='w-full h-[60px] flex justify-start items-center text-white text-3xl'> 
                <h1 className='ml-12 kanitfont'>{blogpost.title}</h1>
            </div>
            <div className='w-full h-[120px] flex flex-col justify-start items-start text-white text-md rounded-b-2xl '>
                <p className='ml-12 mr-12 mt-6 mb-6 lexendfont line-clamp-5'>
                    {blogpost.description}
                </p>
            </div>
            <div className='w-full h-[60px] flex justify-end items-center '>
                <a href={`/blog/post/${index + 1}`} className='bg-darkred px-6 py-2 mr-2 lexendfont text-xl font-bold text-white rounded-xl'>FULL POST {">>"}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
