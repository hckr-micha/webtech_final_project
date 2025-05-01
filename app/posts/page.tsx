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
      <div className="animate-spin inline-block w-10 h-10 border-4 rounded-full border-blue-500 border-t-transparent"></div>
      <span className="ml-3 text-lg font-medium">Loading posts...</span>
    </div>
  );
  if (error) return <div className="text-red-600 text-center mt-6">Error loading posts: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">Posts List</h1>
      <ul className="space-y-4">
        {posts?.map((post) => (
          <li key={post.id} className="p-5 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
            <Link href={`/posts/${post.id}`} className="block font-semibold text-xl text-blue-700 hover:underline">
              {post.title}
            </Link>
            <p className="mt-2 text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
