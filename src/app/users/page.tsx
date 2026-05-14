'use client'

import { useSearchParams } from "next/navigation";
import { User } from '../types';
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import Link from 'next/link';

export default function Users() {

    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            setUsers([]);
            setError(null);
            setLoading(true);
            try {
                const response = await fetch(`https://api.github.com/search/users?q=${query}`, {signal: controller.signal});
                if (!response.ok) throw new Error('Error');
                const data = await response.json();
                setUsers(data.items);
            }
            catch (error) {
                if (error instanceof Error && error.name !== "AbortError") {
                    setError(error);
                }
            }
            finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        })();

        return () => controller.abort();
    }, [query])

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {users.map((user) => <Link key={user.id} href={`/users/${user.login}`} className="w-max"><UserCard login={user.login} avatar={user.avatar_url}/></Link>)}
        </div>
    )
}