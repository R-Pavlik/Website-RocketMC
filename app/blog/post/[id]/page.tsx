"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter for redirect
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../api/firebaseConfig'; // Your Firebase config

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

  if (loading) return (
    <div className='w-screen h-screen flex justify-center items-start bg-darkgray'>
      <div className='w-[10%] h-[10%]'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle fill="#E96745" stroke="#E96745" strokeWidth="8" r="15" cx="40" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
          </circle>
          <circle fill="#E96745" stroke="#E96745" strokeWidth="8" r="15" cx="100" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
          </circle>
          <circle fill="#E96745" stroke="#E96745" strokeWidth="8" r="15" cx="160" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
          </circle>
        </svg>
      </div>
    </div>
  );

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
