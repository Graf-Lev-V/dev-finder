'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';

type User = {
    avatar_url: string;
    login: string;
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

    const router = useRouter();

    return (
        <div className="max-w-md mx-auto p-8 bg-gray-100 rounded-xl shadow-md mt-8">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center">{error.message}</p>}
            {user?.avatar_url && 
            <Image 
                src={user.avatar_url} 
                alt={`${login} avatar`} 
                width={128} 
                height={128}
                className="rounded-full mx-auto"
            />}
            <p className="text-lg font-bold text-center mt-2">{user?.login}</p>
            <p className="text-gray-700 text-center mb-4 mt-1">{user?.bio}</p>
            <div className="flex gap-4 justify-center text-gray-700">
                <p>Followers: <span className="font-bold text-black">{user?.followers}</span></p>
                <p>Following: <span className="font-bold text-black">{user?.following}</span></p>
                <p>Repositories: <span className="font-bold text-black">{user?.public_repos}</span></p>
            </div>
            <p className="text-gray-700 text-center">{user?.location}</p>
            <div className="flex gap-4 mt-4 justify-center">
                <a 
                    href={`https://github.com/${login}`}
                    target="_blank"
                    className="bg-blue-600 text-white p-4 hover:bg-blue-800 rounded-lg hover:cursor-pointer"
                >Github profile</a>
                <button 
                    onClick={() => router.back()}
                    className="bg-gray-600 text-white p-4 hover:bg-gray-800 rounded-lg hover:cursor-pointer"
                >Back</button>
            </div>
        </div>
    )
}