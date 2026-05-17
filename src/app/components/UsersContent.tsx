'use client'

import { useSearchParams } from "next/navigation";
import { User } from '../types';
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import Loader from "./Loader";

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
        <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Results for: {query}</h2>
            {loading && <Loader/>}
            {error && <p>{error.message}</p>}
            <div className="grid grid-cols-3 gap-4">
                {users.map((user) => <UserCard key={user.id} login={user.login} avatar={user.avatar_url}/>)}
            </div>
        </div>
    )
}