"use client";  // Označí komponentu jako Client Component
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../../api/firebaseConfig";
import { FaTrash, FaEdit } from 'react-icons/fa';

interface BlogPosts {
    banner: string;
    title: string;
    description: string;
    id: string;  // Changed to string to accommodate Firestore document ID
}

export default function PostList() {
    const [blogposts, setBlogposts] = useState<BlogPosts[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'posts'));
                const posts = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id  // Add Firestore document ID to the post object
                })) as BlogPosts[];
                setBlogposts(posts);
            } catch (error) {
                console.error('Chyba při načítání příspěvků:', error);
            }
            setLoading(false);
        };

        fetchBlogPosts();
    }, []);

    const handleDelete = async (docId: string) => {
        try {
            await deleteDoc(doc(db, 'posts', docId));
            setBlogposts(blogposts.filter(post => post.id !== docId));
        } catch (error) {
            console.error('Chyba při odstraňování příspěvku:', error);
        }
    };

    return (
        <div className='w-full h-full bg-darkestgray overflow-x-hidden'>
            <div className='w-full md:h-[80px] h-[110px] flex justify-start items-center md:flex-row flex-col md:gap-12 gap-2'>
                <h1 className='text-white kanitfont underline text-4xl font-bold md:ml-24 ml-2'>BLOG POSTS:</h1>
                <a href="/admin/blogposts/create" className='mt-1 px-4 py-2 bg-green rounded-xl flex justify-center items-center text-white text-xl font-semibold'>Create Post</a>
            </div>

            <div className="w-full max-h-max grid md:grid-cols-3 grid-cols-1 gap-6 p-4 bg-darkestgray">
                {blogposts.map((blogpost) => (
                    <div key={blogpost.id} className='md:w-[420px] w-full h-full bg-darkergray rounded-2xl mt-2 mb-2'>
                        <div className='w-full h-[200px]'>
                            <img
                                src={blogpost.banner}
                                className='w-full h-full object-cover rounded-t-2xl'
                            />
                        </div>
                        <div className='w-full h-auto flex justify-start items-center text-white text-3xl mt-2'>
                            <h1 className='ml-12 kanitfont'>{blogpost.title}</h1>
                        </div>
                        <div className='w-full h-auto flex flex-col justify-start items-start text-white text-md rounded-b-2xl'>
                            <p className='ml-12 mr-12 mt-1 mb-2 lexendfont line-clamp-6'>
                                {blogpost.description}
                            </p>
                            <div className='flex justify-between ml-12 mb-2'>
                                <button
                                    onClick={() => handleDelete(blogpost.id)}
                                    className='text-red-500 hover:text-red-700 transition-colors'
                                    title="Delete Post"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
