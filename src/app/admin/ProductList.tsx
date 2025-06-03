// src/app/admin/ProductList.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductList({ products }: { products: any[] }) {
  const [productList, setProductList] = useState(products);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Atualiza a lista localmente (opcional)
        setProductList(productList.filter((p) => p.id !== id));
        // Atualiza a página e revalida os dados do servidor
        router.refresh();
      } else {
        alert("Erro ao excluir produto.");
      }
    }
  };

  return (
    <div>
      <Link
        href="/admin/create-product"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Adicionar Produto
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-sm text-gray-700">R$ {product.price.toFixed(2)}</p>

            <div className="flex gap-2 mt-3">
              <Link
                href={`/admin/edit-product/${product.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
