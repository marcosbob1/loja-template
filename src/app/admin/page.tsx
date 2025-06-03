// src/app/admin/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProductList from "./ProductList";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
      <p className="mb-4">
        Bem-vindo, {session.user?.name || session.user?.email}!
      </p>

      <ProductList products={products} />
    </main>
  );
}
