'use client'

import { useRouter } from "next/navigation";

type SearchBarProps = {
    search: string,
    setSearch: (value: string) => void,
    className: {
        container?: string,
        input?: string,
        button?: string
    }
}

export default function SearchBar({search, setSearch, className}: SearchBarProps) {

    const router = useRouter();

    return (
      <div className={className.container}>
        <input
          className={className.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {if (e.key === 'Enter') router.push(`/users/?q=${search}`)}}
        />
        <button 
          className={className.button} 
          onClick={() => router.push(`/users/?q=${search}`)}
        >Search</button>
      </div>
    )
}