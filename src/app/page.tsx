'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const router = useRouter();

  const [search, setSearch] = useState('')

  return (
    <div>
      <h1 className="text-xl">Dev Finder</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)}/>
      <button onClick={() => router.push(`/users/?q=${search}`)}>Search</button>
    </div>
  );
}
