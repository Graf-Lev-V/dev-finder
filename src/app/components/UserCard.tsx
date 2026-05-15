import Image from 'next/image'
import Link from 'next/link'

export default function UserCard({login, avatar}: {login: string; avatar: string;}) {
    return (
        <Link 
            href={`/users/${login}`}
            className='bg-gray-300 p-4 rounded-md 
            shadow-md hover:shadow-lg hover:cursor-pointer
            flex flex-col gap-2 items-center'>
                <Image 
                    src={avatar} 
                    alt={`${login} avatar`} 
                    width={64} 
                    height={64}
                    className='rounded-full'/>
                <p className='text-lg font-bold text-gray-900 text-center'>{login}</p>
        </Link>
    )
}