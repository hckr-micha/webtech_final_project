"use client";

import Link from "next/link";
import React from "react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "USERS", href: "/users" },
  { label: "POSTS", href: "/posts" },
  { label: "DASHBOARD", href: "/" },
];

export default function Navbar() {
  return (
    <nav className="shadow-md" style={{ backgroundColor: 'rgb(181, 190, 198)' }}>
      <div className="max-w-7xl mx-auto px-10 py-6 flex items-center justify-between">
        <div className="text-5xl font-extrabold text-darkGreen">
          <Link href="/">
            <span className="pr-6 cursor-pointer">CHIKA</span>
          </Link>
        </div>
        <div className="flex items-center text-lg font-medium tracking-widest">
          {navItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <Link href={item.href}>
                <span className="text-lavanderGray hover:text-darkGreen cursor-pointer transition uppercase">
                  {item.label}
                </span>
              </Link>
              {index < navItems.length - 1 && (
                <span className="text-lavenderGray select-none">&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}
