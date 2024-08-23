"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter for redirect
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../api/firebaseConfig'; // Your Firebase config
import Loader from '@/app/utils/Loader';

interface BlogPost {
  banner: string;
  title: string;
  description: string;
}

export default function PostPage() {
  const router = useRouter();
  const { id } = useParams();
  const [blogpost, setBlogpost] = useState<BlogPost | null>(null); // State for blog post
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true); // Set loading state
      if (typeof id === 'string') {
        const numericId = parseInt(id, 10); // Convert ID to number
        console.log('ID:', numericId); // Debug output

        if (!isNaN(numericId)) {
          try {
            // Query to get the post by ID
            const q = query(collection(db, 'posts'), where('id', '==', numericId));
            console.log('Query:', q); // Debug output

            const querySnapshot = await getDocs(q);
            console.log('Documents Found:', querySnapshot.size); // Debug output
            
            if (!querySnapshot.empty) {
              const postData = querySnapshot.docs[0].data() as BlogPost;
              setBlogpost(postData); // Set post data to state
              setExists(true);
            } else {
              setExists(false);
            }
          } catch (error) {
            console.error('Error fetching post:', error);
            setExists(false);
          }
        }
      }
      setLoading(false); // End loading state
    };

    fetchPost();
  }, [id]);

  if (loading) return <Loader />

  if (exists === false) {
    router.push('/404'); // Redirect to 404 page if post does not exist
    return null;
  }

  return (
    <div>
      {exists === true && blogpost ? (
        <div className="w-screen h-screen flex flex-col-reverse justify-center items-center p-4 gap-6 bg-darkgray">
          <div className='md:w-[1200px] w-[95%] h-[740px] bg-darkergray rounded-2xl'>
            <div className='w-full md:h-[400px] h-[120px]'>
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
          </div>
        </div>
      ) : null}
    </div>
  );
}
