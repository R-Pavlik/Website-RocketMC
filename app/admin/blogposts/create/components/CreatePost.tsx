"use client";
import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from "../../../../api/firebaseConfig";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BlogPosts {
  banner: string;
  title: string;
  description: string;
  id: number;
}

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function PostList() {
  const [blogposts, setBlogposts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newPostName, setNewPostName] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [newPostTime, setNewPostTime] = useState(getCurrentDateTime());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const posts = querySnapshot.docs.map((doc) => doc.data() as BlogPosts);
        setBlogposts(posts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  const getNextPostId = async () => {
    try {
      const postsQuery = query(collection(db, 'posts'), orderBy('id', 'desc'), limit(1));
      const querySnapshot = await getDocs(postsQuery);

      if (!querySnapshot.empty) {
        const lastPost = querySnapshot.docs[0].data() as BlogPosts;
        const lastId = Number(lastPost.id);
        return lastId + 1; // Přičte 1 k poslednímu ID
      } else {
        return 1; // Pokud v databázi ještě není žádný příspěvek, vrátí se 1 jako první ID.
      }
    } catch (error) {
      console.error('Error fetching last post ID:', error);
      return 1; // Vrátí výchozí hodnotu v případě chyby.
    }
  };

  const handleSubmit = async () => {
    if (newPostName && newPostDescription && newPostImage && newPostTime) {
      try {
        const newId = await getNextPostId(); // Získání ID pro nový příspěvek

        await addDoc(collection(db, 'posts'), {
          id: newId, // Přidání ID do nového příspěvku
          title: newPostName,
          description: newPostDescription,
          banner: newPostImage,
          time: newPostTime
        });

        setNewPostName('');
        setNewPostDescription('');
        setNewPostImage('');
        setNewPostTime(getCurrentDateTime());
        setError(null);

        toast.success('Post submitted successfully!');
      } catch (error) {
        setError('Error sending post. Please try again.');
        console.error('Error sending post:', error);
        toast.error('Error sending post. Please try again.');
      }
    } else {
      setError('All fields must be filled.');
      toast.error('All fields must be filled.');
    }
  };

  return (
    <div className='w-scren md:h-full max-h-max bg-darkestgray overflow-hidden'>
      <div className='w-full md:h-[80px] h-[110px] flex justify-start items-center md:flex-row flex-col md:gap-12 gap-2'>
        <h1 className='text-white kanitfont underline text-4xl font-bold md:ml-24 ml-2'>CREATE POST:</h1>
      </div>

      <div className="w-full md:h-[615px] max-h-max bg-darkestgray flex flex-row justify-center items-start p-3 mb-12">
        <div className='md:w-[1300px] w-full h-[550px] bg-darkgray rounded-2xl flex justify-center items-center flex-col'>
          <div className='w-full md:h-[200px] h-[120px]'>
            <img
              // src="/rocketmc-bg.png"
              src={newPostImage}
              alt='Please insert link to display banner image.'
              className='w-full h-full object-cover rounded-t-2xl text-white'
            />
          </div>
          <div className=' md:w-[95%] w-full h-[410px] rounded-b-2x'>
            <div className="mb-4 mt-4">
              <input
                type="text"
                id="new-name"
                className="w-full px-4 py-2 border-gray rounded-lg bg-footergray placeholder-gray required text-white"
                value={newPostName}
                placeholder='Post title'
                onChange={(e) => setNewPostName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                id="new-description"
                className="w-full px-4 py-2 border-gray rounded-lg bg-footergray placeholder-gray required text-white"
                value={newPostDescription}
                placeholder='Post description'
                onChange={(e) => setNewPostDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="new-image"
                className="w-full px-4 py-2 border-gray rounded-lg bg-footergray placeholder-gray required text-white"
                value={newPostImage}
                placeholder='Post Banner link'
                onChange={(e) => setNewPostImage(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="datetime-local"
                id="new-time"
                className="w-full px-4 py-2 border-gray rounded-lg bg-footergray placeholder-gray required text-white "
                value={newPostTime}
                onChange={(e) => setNewPostTime(e.target.value)}
              />
            </div>
            {error && <p className="text-red">{error}</p>}
            <button
              onClick={handleSubmit}
              className="bg-green text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
