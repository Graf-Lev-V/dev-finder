import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-gray-900 p-4 text-white">
            <nav className="flex gap-4">
                <Link href='/'>Home</Link>
                <Link href='https://github.com/Graf-Lev-V/dev-finder'>Repository</Link>
            </nav>
        </header>
    )
}