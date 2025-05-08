"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin inline-block w-10 h-10 border-4 rounded-full border-primary border-t-transparent"></div>
      <span className="ml-3 text-lg font-medium text-accent">Loading posts...</span>
    </div>
  );
  if (error) return <div className="text-alertRed text-center mt-6">Error loading posts: {error}</div>;

  return (
    <div className="p-6 mx-auto bg-neutralWhite rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 border-b border-secondary pb-2 text-secondary">Posts List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <li
            key={post.id}
            className="p-5 border border-secondary rounded-xl shadow-md bg-primary cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-accent hover:text-neutralWhite active:bg-secondary active:text-neutralWhite"
          >
            <Link href={`/posts/${post.id}`} className="block font-semibold text-xl hover:underline text-neutralWhite">
              {post.title}
            </Link>
            <p className="mt-2 text-accent">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}