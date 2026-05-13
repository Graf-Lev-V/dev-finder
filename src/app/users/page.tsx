'use client';

import { useSearchParams } from "next/navigation";
import { User } from '../types';
import { useEffect, useState } from "react";

export default function Users() {

    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    const [users, setUsers] = useState<User[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setUsers([]);
            setErrorMessage(null);
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${query}`);
            if (!response.ok) throw new Error('Error');
            const data = await response.json();
            setUsers(data.items);
        }
        catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        }
    })();
    }, [query])

    return (
        <>
            {errorMessage && <p>{errorMessage}</p>}
            {users.map((user) => <p key={user.id}>{user.login}</p>)}
        </>
    )
}