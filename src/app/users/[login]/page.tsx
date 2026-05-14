'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';

type User = {
    avatar_url: string;
    bio: string;
    followers: string;
    following: string;
    public_repos: string;
    location: string;
}

export default function User() {

    const { login } = useParams();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            setUser(null);
            setError(null);
            setLoading(true);
            try {
                const response = await fetch(`https://api.github.com/users/${login}`, {signal: controller.signal});
                if (!response.ok) throw new Error('Error');
                const data = await response.json();
                setUser(data);
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
        }
        )();

        return () => controller.abort();
    }, [login])

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {user?.avatar_url && <Image src={user.avatar_url} alt={`${login} avatar`} width={64} height={64}></Image>}
            <p>Bio: {user?.bio}</p>
            <p>Followers: {user?.followers}</p>
            <p>Following: {user?.following}</p>
            <p>Repositories: {user?.public_repos}</p>
            <p>Location: {user?.location}</p>
        </div>
    )
}