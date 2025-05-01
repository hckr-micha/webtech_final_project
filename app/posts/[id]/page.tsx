"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorPost, setErrorPost] = useState<string | null>(null);
  const [errorComments, setErrorComments] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        setErrorPost(err.message);
      } finally {
        setLoadingPost(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(data);
      } catch (err: any) {
        setErrorComments(err.message);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  if (loadingPost) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin inline-block w-10 h-10 border-4 rounded-full border-blue-500 border-t-transparent"></div>
      <span className="ml-3 text-lg font-medium">Loading post...</span>
    </div>
  );
  if (errorPost) return <div className="text-red-600 text-center mt-6">Error loading post: {errorPost}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">{post?.title}</h1>
      <p className="text-gray-700 text-lg">{post?.body}</p>

      <div>
        <h2 className="text-3xl font-semibold mb-6 border-b border-gray-300 pb-2">Comments</h2>
        {loadingComments ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin inline-block w-10 h-10 border-4 rounded-full border-green-500 border-t-transparent"></div>
            <span className="ml-3 text-lg font-medium">Loading comments...</span>
          </div>
        ) : errorComments ? (
          <div className="text-red-600 text-center mt-6">Error loading comments: {errorComments}</div>
        ) : (
          <ul className="space-y-6">
            {comments.map((comment) => (
              <li key={comment.id} className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <p className="font-semibold text-lg">{comment.name} <span className="text-gray-500 text-sm">({comment.email})</span></p>
                <p className="text-gray-700 mt-2">{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
