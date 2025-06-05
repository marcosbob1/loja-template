"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, ArrowLeft } from "lucide-react";

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
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Editar Produto</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
          <input
            type="number"
            value={price}
            step="0.01"
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition"
            >
              <Save size={15} /> Salvar Alterações
            </button>

            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition"
              onClick={handleDelete}
            >
              <Trash2 size={15} /> Excluir Produto
            </button>
          </div>

          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Voltar
          </button>
        </div>
      </form>
    </main>
  );
}
