'use client'

import { useState } from "react";
import SearchBar from "./components/SearchBar";

export default function Home() {

  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col items-center justify-center flex-1 pb-32">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">Dev Finder</h1>
      <p className="text-gray-700 text-base mb-8">Search GitHub users by username.</p>
      <SearchBar search={search} setSearch={setSearch} className={{
        container: "flex gap-2",
        input: "border border-gray-300 py-3 px-4 rounded-md w-80 focus:outline-offset-2 focus:outline-2 outline-blue-500",
        button: "bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-800 hover:cursor-pointer focus:outline-offset-2 focus:outline-2 outline-black"
      }}/>
    </div>
  );
}
