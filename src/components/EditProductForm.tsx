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

      if (!res.ok) throw new Error("Erro ao atualizar produto");

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

        if (!res.ok) throw new Error("Erro ao excluir produto");

        alert("Produto excluído com sucesso!");
        router.push("/admin");
      } catch (err) {
        console.error(err);
        setError("Erro ao excluir produto");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Petisco Canino"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: 29.99"
          step="0.01"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex justify-between gap-4 mt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition w-full"
        >
          Salvar Alterações
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition w-full"
        >
          Excluir Produto
        </button>
      </div>
    </form>
  );
}
