import type { User } from '../types';

type UserStatsProps = {
    className: {
        container?: string,
        followers?: string,
        following?: string,
        repositiries?: string
    },
    user: User | null
}


export default function UserStats({className, user}: UserStatsProps) {
    return (
        <div className={className.container}>
            <p>Followers: <span className={className.followers}>{user?.followers}</span></p>
            <p>Following: <span className={className.following}>{user?.following}</span></p>
            <p>Repositories: <span className={className.repositiries}>{user?.public_repos}</span></p>
        </div>
    )
}