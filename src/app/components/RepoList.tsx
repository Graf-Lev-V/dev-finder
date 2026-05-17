import { useEffect, useState } from 'react';
import Loader from './Loader';

type Repo = {
    id: number,
    name: string,
    description: string | null,
    stargazers_count: number,
    language: string | null,
    html_url: string
}

export default function RepoList({login}: {login: string}) {

    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            setRepos([]);
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.github.com/users/${login}/repos`, {signal: controller.signal});
                if (!response.ok) throw new Error('Error');
                const data = await response.json();
                setRepos(data);
            }
            catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
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
    }, [login])

    return (
        <div className='p-6'>
            <h3 className='text-bold text-xl my-4'>Repositories</h3>
            <div className='grid grid-cols-2 gap-4'>
                {loading && <Loader/>}
                {error && <p>{error.message}</p>}
                {repos.map((repo) => 
                <div key={repo.id} className='bg-white p-4 rounded-md shadow-md border border-gray-200 flex flex-col gap-1'>
                    <a href={repo.html_url} target='_blank' className='hover:underline font-bold text-blue-600 w-max'>{repo.name}</a>
                    <p className='text-gray-700 text-sm'>{repo.description || 'No description'}</p>
                    <div className='flex gap-1 items-center mt-auto'>
                        <p className='bg-gray-100 px-2 py-1 rounded text-sm w-max'>{repo.language || 'Unknown'}</p>
                        <p className='text-gray-600'>⭐ {repo.stargazers_count}</p>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}