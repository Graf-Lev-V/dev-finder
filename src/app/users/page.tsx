import { Suspense } from "react";
import UsersContent from '../components/UsersContent';
import Loader from "../components/Loader";

export default function Users() {
    return (
        <Suspense fallback={<Loader className="p-6"/>}>
            <UsersContent/>
        </Suspense>
    )
}