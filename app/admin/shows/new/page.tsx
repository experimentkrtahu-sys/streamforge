import { AdminShowForm } from "@/components/admin/show-form";
import { requireAdmin } from "@/lib/auth/guards";

export default async function NewShowPage() {
  await requireAdmin();
  return (
    <div className="container-page py-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Show</h1>
      <AdminShowForm />
    </div>
  );
}
