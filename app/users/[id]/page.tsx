"use client";

import React, { useEffect, useState } from "react";
import UserMap from "../../components/UserMap";
import Link from "next/link";

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

interface UserProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

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
      <div className="animate-spin inline-block w-10 h-10 border-4 rounded-full border-primary border-t-transparent"></div>
      <span className="ml-3 text-lg font-medium text-primary">Loading user...</span>
    </div>
  );
  if (errorUser) return <div className="text-alertRed text-center mt-6">{errorUser}</div>;

  return (
    <main className="min-h-screen bg-neutralWhite py-16 px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* User Info and Map in two columns */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* User Info */}
          <div className="col-span-1 bg-lightGray p-20 rounded-2xl shadow-md flex flex-col justify-between h-full">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-4">{user?.name}</h1>
              <span className="inline-block bg-accent text-neutralWhite text-sm font-semibold px-4 py-2 rounded-full mb-8">{user?.username}</span>
              <div className="text-darkGray space-y-6 text-base">
                <p><strong>Email:</strong> <a href={`mailto:${user?.email}`} className="text-secondary hover:underline">{user?.email}</a></p>
                <p><strong>Phone:</strong> {user?.phone}</p>
                <p><strong>Website:</strong> <a href={`http://${user?.website}`} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">{user?.website}</a></p>
                <p><strong>Address:</strong> {user?.address.street}, {user?.address.suite}, {user?.address.city}, {user?.address.zipcode}</p>
              </div>
            </div>
            <div className="mt-10 text-sm text-secondary font-medium">
              <p>Additional Info or Footer Section</p>
            </div>
          </div>

          {/* Map */}
          <div className="col-span-2 bg-lightGray p-10 rounded-2xl shadow-md">
            {user?.address.geo.lat && user?.address.geo.lng ? (
              <UserMap lat={parseFloat(user.address.geo.lat)} lng={parseFloat(user.address.geo.lng)} />
            ) : (
              <p className="text-secondary text-center">Map data not available</p>
            )}
          </div>
        </section>

        {/* Posts */}
        <section>
          <h2 className="text-3xl font-bold text-primary mb-8">Posts</h2>
          {loadingPosts ? (
            <div className="flex justify-center items-center h-40 bg-neutralWhite rounded-3xl shadow-lg">
              <div className="animate-spin inline-block w-10 h-10 border-4 rounded-full border-primary border-t-transparent"></div>
              <span className="ml-3 text-lg font-medium text-primary">Loading posts...</span>
            </div>
          ) : errorPosts ? (
            <div className="text-alertRed text-center mt-6">{errorPosts}</div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <li key={post.id} className="p-6 bg-neutralWhite rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-secondary">
                  <Link href={`/posts/${post.id}`} className="text-primary hover:underline font-semibold text-lg">
                    {post.title}
                  </Link>
                  <p className="text-darkGray text-base mt-2">{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
