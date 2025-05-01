"use client";

import React from "react";

export default function TestStyles() {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Tailwind CSS Test</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Flowbite Style Button
      </button>
      <div className="mt-4 p-4 border border-gray-300 rounded shadow hover:shadow-lg transition">
        This box uses Tailwind CSS and Flowbite utility classes.
      </div>
    </div>
  );
}
