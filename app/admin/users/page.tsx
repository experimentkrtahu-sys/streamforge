import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db/prisma";

export default async function UsersPage() {
  await requireAdmin();
  const users = await prisma.user.findMany({ include: { profile: true }, orderBy: { createdAt: "desc" }, take: 50 });
  return (
    <div className="container-page py-6 space-y-3">
      <h1 className="text-2xl font-bold">Users</h1>
      {users.map((user) => (
        <div key={user.id} className="rounded bg-card p-3 text-sm">
          {user.profile?.displayName ?? "Unnamed"} • {user.email} • {user.role}
        </div>
      ))}
    </div>
  );
}
