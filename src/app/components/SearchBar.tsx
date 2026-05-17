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
      <form 
        className={className.container} 
        onSubmit={(e) => 
        {e.preventDefault(); 
        if (!search.trim()) return;
        router.push(`/users/?q=${search}`)}
        }>
          <input
            className={className.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxLength={50}
            required
          />
          <button className={className.button} type="submit">Search</button>
      </form>
    )
}