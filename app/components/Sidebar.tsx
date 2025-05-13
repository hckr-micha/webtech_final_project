"use client";

import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <>
      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`fixed top-0 right-0 bg-primary text-neutralWhite w-64 min-h-screen p-6 z-50 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="md:hidden mb-6 text-neutralWhite"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold mb-6">Dashboard Menu</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/" className="hover:text-accent transition-colors duration-300" onClick={toggleSidebar}>
                Overview
              </Link>
            </li>
            <li>
              <Link href="/users" className="hover:text-accent transition-colors duration-300" onClick={toggleSidebar}>
                Users
              </Link>
            </li>
            <li>
              <Link href="/posts" className="hover:text-accent transition-colors duration-300" onClick={toggleSidebar}>
                Posts
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
