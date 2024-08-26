"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../api/firebaseConfig";
import { FaTrash, FaEdit } from "react-icons/fa";

interface BlogPosts {
  banner: string;
  title: string;
  description: string;
  id: string;
}

export default function PostList() {
  const [blogposts, setBlogposts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [postEdit, setPostEdit] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<BlogPosts | null>(null); // Stav pro aktuální upravovaný příspěvek

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const posts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as BlogPosts[];
        setBlogposts(posts);
      } catch (error) {
        console.error("Chyba při načítání příspěvků:", error);
      }
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  const handleDelete = async (docId: string) => {
    try {
      await deleteDoc(doc(db, "posts", docId));
      setBlogposts(blogposts.filter((post) => post.id !== docId));
    } catch (error) {
      console.error("Chyba při odstraňování příspěvku:", error);
    }
  };

  const handleEdit = (post: BlogPosts) => {
    setCurrentPost(post); // Nastavíme aktuální příspěvek
    setPostEdit(true); // Zobrazíme popup
  };

  const handleUpdate = async () => {
    if (currentPost) {
      try {
        const postRef = doc(db, "posts", currentPost.id);
        await updateDoc(postRef, {
          title: currentPost.title,
          description: currentPost.description,
          banner: currentPost.banner,
        });

        // Aktualizace příspěvků v seznamu po úpravě
        setBlogposts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === currentPost.id ? currentPost : post
          )
        );

        setPostEdit(false); // Skrytí popupu po úspěšné aktualizaci
      } catch (error) {
        console.error("Chyba při úpravě příspěvku:", error);
      }
    }
  };

  const handleChange = (name: string, value: string) => {
    if (currentPost) {
      setCurrentPost((prevPost) => ({
        ...prevPost!,
        [name]: value,
      }));
    }
  };

  return (
    <div className="w-full h-full bg-darkestgray overflow-x-hidden">
      <div className="w-full md:h-[80px] h-[110px] flex justify-start items-center md:flex-row flex-col md:gap-12 gap-2">
        <h1 className="text-white kanitfont underline text-4xl font-bold md:ml-24 ml-2">
          BLOG POSTS:
        </h1>
        <a
          href="/admin/blogposts/create"
          className="mt-1 px-4 py-2 bg-green rounded-xl flex justify-center items-center text-white text-xl font-semibold"
        >
          Create Post
        </a>
      </div>

      <div className="w-full max-h-max grid md:grid-cols-3 grid-cols-1 gap-6 p-4 bg-darkestgray">
        {blogposts.map((blogpost) => (
          <div
            key={blogpost.id}
            className="md:w-[420px] w-full h-full bg-darkergray rounded-2xl mt-2 mb-2"
          >
            <div className="w-full h-[200px]">
              <img
                src={blogpost.banner}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>
            <div className="w-full h-auto flex justify-start items-center text-white text-3xl mt-2">
              <h1 className="ml-12 kanitfont">{blogpost.title}</h1>
            </div>
            <div className="w-full h-auto flex flex-col justify-start items-start text-white text-md rounded-b-2xl">
              <p className="ml-12 mr-12 mt-1 mb-2 lexendfont line-clamp-6">
                {blogpost.description}
              </p>
              <div className="flex justify-between ml-12 mb-2">
                <button
                  onClick={() => handleDelete(blogpost.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete Post"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleEdit(blogpost)}
                  className="text-blue-500 hover:text-blue-700 transition-colors ml-4"
                  title="Edit Post"
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Post Popup */}
      {postEdit && currentPost && (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center p-3 z-50">
          <div className="w-full md:w-[1000px] h-[550px] bg-darkgray rounded-2xl flex flex-col">
            <div className="w-full md:h-[200px] h-[120px]">
              <img
                src={currentPost.banner}
                alt="Banner"
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>
            <div className="w-full h-[420px] rounded-b-2xl flex flex-col p-4">
              <h2 className="text-2xl font-bold mb-4 text-white">Edit Post</h2>
              <form
                onSubmit={(e: FormEvent) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                <div className="mb-4">
                  <input
                    type="text"
                    id="edit-title"
                    name="title"
                    className="w-full px-4 py-2 border-gray rounded-lg bg-footergray placeholder-gray text-white"
                    value={currentPost.title}
                    placeholder="Post title"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    id="edit-description"
                    name="description"
                    className="w-full px-4 py-2 border-gray rounded-lg bg-footergray placeholder-gray text-white"
                    value={currentPost.description}
                    placeholder="Post description"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    rows={4}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    id="edit-banner"
                    name="banner"
                    className="w-full px-4 py-2 border-gray rounded-lg bg-footergray placeholder-gray text-white"
                    value={currentPost.banner}
                    placeholder="Post Banner link"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex justify-start flex-row  gap-4 ">
                <button
                    type="submit"
                    className="bg-green text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostEdit(false)}
                    className="bg-gray text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
