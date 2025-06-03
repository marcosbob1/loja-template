"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditProductFormProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
   const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, imageUrl }),
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar produto");
      }

      alert("Produto atualizado com sucesso!");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar produto");
    }
  };

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const res = await fetch(`/api/products/${product.id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error("Erro ao excluir produto");
        }
        alert("Produto excluído com sucesso!");
        router.push("/admin");
      } catch (err) {
        console.error(err);
        setError("Erro ao excluir produto");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Preço</label>
        <input
          type="number"
          value={price}
          step="0.01"
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Salvar Alterações
      </button>
       <button
          type="button"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleDelete}
        >
          Excluir Produto
        </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
