import Link from "next/link";
import { auth } from "@/lib/auth";

export async function Navbar() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-accent">StreamForge</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/browse">Browse</Link>
          {session?.user ? <Link href="/profile">Profile</Link> : <Link href="/auth/login">Login</Link>}
          {session?.user.role === "ADMIN" && <Link href="/admin">Admin</Link>}
        </nav>
      </div>
    </header>
  );
}
