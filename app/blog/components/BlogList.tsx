"use client";  // Označí komponentu jako Client Component

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Importujte konfiguraci Firebase z externího souboru
import firebaseConfig from '../../api/firebaseConfig';
import Loader from '@/app/utils/Loader';

// Inicializujte Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface BlogPosts {
  banner: string;
  title: string;
  description: string;
  id: number; // Přidáme id pro příspěvek
}

export default function BlogPostsComponent() {
  const [blogposts, setBlogposts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Načítání všech příspěvků
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const posts = querySnapshot.docs.map((doc) => doc.data() as BlogPosts);
        setBlogposts(posts);  // Nastavení všech příspěvků do stavu
      } catch (error) {
        console.error('Chyba při načítání příspěvků:', error);
      }
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  if (loading) return <Loader />

  return (
    <div className="w-screen h-full bg-darkgray">
      <div className="w-screen h-screen flex flex-col-reverse justify-end items-center p-4 gap-6 bg-darkgray">
        {blogposts.map((blogpost) => (
          <div key={blogpost.id} className='md:w-[1200px] w-[95%] h-[440px] bg-darkergray rounded-2xl'>
            <div className='w-full h-[200px]'>
              <img 
                src={blogpost.banner} 
                className='w-full h-full object-cover rounded-t-2xl' 
              />
            </div>
            <div className='w-full h-[60px] flex justify-start items-center text-white text-3xl'> 
              <h1 className='ml-12 kanitfont'>{blogpost.title}</h1>
            </div>
            <div className='w-full h-[120px] flex flex-col justify-start items-start text-white text-md rounded-b-2xl '>
              <p className='ml-12 mr-12 mt-6 mb-6 lexendfont line-clamp-5 lin'>
                {blogpost.description}
              </p>
            </div>
            <div className='w-full h-[60px] flex justify-end items-center '>
              <a href={`/blog/post/${blogpost.id}`} className='bg-darkred px-6 py-2 mr-2 lexendfont text-xl font-bold text-white rounded-xl'>FULL POST {">>"}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
