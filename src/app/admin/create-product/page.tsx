"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !image) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price: parseFloat(price), imageUrl: image }),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar produto");

      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Erro ao cadastrar produto.");
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Produto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}

        <div>
          <label className="block mb-1 font-medium">Nome do Produto</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Preço</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">URL da Imagem</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}
