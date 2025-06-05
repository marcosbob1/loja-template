"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductList({ products }: { products: any[] }) {
  const [productList, setProductList] = useState(products);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProductList(productList.filter((p) => p.id !== id));
        router.refresh();
      } else {
        alert("Erro ao excluir produto.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 mb-4">
        <Link
          href="/admin/create-product"
          className="self-start px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Adicionar Produto
        </Link>
        <h2 className="text-xl font-semibold">Produtos Cadastrados</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">
                R$ {product.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Link
                href={`/admin/edit-product/${product.id}`}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
              >
                <Pencil className="w-4 h-4" />
                Editar
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
