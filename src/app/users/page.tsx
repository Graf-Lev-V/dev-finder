import { Suspense } from "react";
import UsersContent from '../components/UsersContent';

export default function Users() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <UsersContent/>
        </Suspense>
    )
}