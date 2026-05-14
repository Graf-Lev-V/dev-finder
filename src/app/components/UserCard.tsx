import Image from 'next/image'

export default function UserCard({login, avatar}: {login: string; avatar: string;}) {
    return (
        <div>
            <Image src={avatar} alt={`${login} avatar`} width={64} height={64}/>
            <p>{login}</p>
        </div>
    )
}