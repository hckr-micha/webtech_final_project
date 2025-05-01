"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UserMap from "../../components/UserMap";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
}

export default function UserProfilePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const [errorPosts, setErrorPosts] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        setErrorUser(err.message);
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        setErrorPosts(err.message);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchUser();
    fetchPosts();
  }, [id]);

  if (loadingUser) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin inline-block w-10 h-10 border-4 rounded-full border-blue-500 border-t-transparent"></div>
      <span className="ml-3 text-lg font-medium text-darkGreen">Loading user...</span>
    </div>
  );
  if (errorUser) return <div className="text-red-600 text-center mt-6">Error loading user: {errorUser}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 bg-paleBlue rounded-lg shadow-lg">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold mb-4 flex items-center gap-3 text-darkGreen">
          {user?.name}
          <span className="bg-lavenderGray text-slateGray text-sm font-semibold px-3 py-1 rounded-full">{user?.username}</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-darkGreen">
          <div className="space-y-4 text-lg">
            <p><strong>Email:</strong> <a href={`mailto:${user?.email}`} className="text-slateGray hover:underline">{user?.email}</a></p>
            <p><strong>Phone:</strong> {user?.phone}</p>
            <p><strong>Website:</strong> <a href={`http://${user?.website}`} target="_blank" rel="noopener noreferrer" className="text-slateGray hover:underline">{user?.website}</a></p>
            <p><strong>Address:</strong> {user?.address.street}, {user?.address.suite}, {user?.address.city}, {user?.address.zipcode}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-darkGreen">Address on Map</h2>
            {user?.address.geo.lat && user?.address.geo.lng ? (
              <UserMap lat={parseFloat(user.address.geo.lat)} lng={parseFloat(user.address.geo.lng)} />
            ) : (
              <p className="text-slateGray">Map data not available</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 border-b border-slateGray pb-2 text-darkGreen">Posts</h2>
        {loadingPosts ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin inline-block w-10 h-10 border-4 rounded-full border-green-500 border-t-transparent"></div>
            <span className="ml-3 text-lg font-medium text-darkGreen">Loading posts...</span>
          </div>
        ) : errorPosts ? (
          <div className="text-red-600 text-center mt-6">Error loading posts: {errorPosts}</div>
        ) : (
          <ul className="space-y-5">
            {posts.map((post) => (
              <li key={post.id} className="cursor-pointer hover:bg-lightGray p-5 rounded-lg border border-lavenderGray shadow-sm hover:shadow-md transition">
                <a href={`/posts/${post.id}`} className="font-semibold text-slateGray hover:text-darkGreen hover:underline text-xl">{post.title}</a>
                <p className="text-slateGray mt-2">{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
