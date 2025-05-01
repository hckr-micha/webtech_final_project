"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin inline-block w-10 h-10 border-4 rounded-full border-blue-500 border-t-transparent"></div>
      <span className="ml-3 text-lg font-medium text-darkGreen">Loading users...</span>
    </div>
  );
  if (error) return <div className="text-red-600 text-center mt-6">Error loading users: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-paleBlue rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 border-b border-slateGray pb-2 text-darkGreen">Users List</h1>
      <ul className="space-y-8">
        {users?.map((user) => (
          <li
            key={user.id}
            className="p-6 border border-lavenderGray rounded-xl shadow-md bg-lightGray cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-paleBlue"
          >
            <Link href={`/users/${user.id}`} className="block">
              <p className="font-semibold text-2xl text-darkGreen hover:underline mb-2">{user.name}</p>
              <p className="text-slateGray text-lg bg-paleBlue rounded-md px-2 py-1 inline-block">{`@${user.username}`}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
