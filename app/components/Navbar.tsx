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
    <nav className="shadow-lg bg-accent hidden md:block" style={{ backgroundColor: "var(--color--black)" }}>
      <div className="max-w-7xl mx-auto px-10 py-6 flex items-center justify-between">
        <div className="text-5xl font-extrabold text-accent">
            <span className="pr-6">
              CHIKA
            </span>
        </div>
        <div className="flex items-center text-lg font-medium tracking-widest">
          {navItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <Link href={item.href}>
                <span className="text-secondary hover:text-accent cursor-pointer transition-colors duration-300 uppercase">
                  {item.label}
                </span>
              </Link>
              {index < navItems.length - 1 && (
                <span className="text-secondary select-none">&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}
