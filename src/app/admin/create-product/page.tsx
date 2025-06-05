"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, ArrowLeft } from "lucide-react";

export default function CreateProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name: string;
    price: string;
    imageUrl: string;
  }>({
    name: "",
    price: "",
    imageUrl: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = { name: "", price: "", imageUrl: "" };
    let hasError = false;

    if (!name.trim()) {
      errors.name = "O nome é obrigatório.";
      hasError = true;
    }

    if (!price || price <= 0) {
      errors.price = "Informe um preço válido.";
      hasError = true;
    }

    if (!imageUrl.trim()) {
      errors.imageUrl = "A URL da imagem é obrigatória.";
      hasError = true;
    }

    setFieldErrors(errors);

    if (hasError) {
      setError(""); // Limpa erro genérico
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, imageUrl }),
      });

      if (!res.ok) throw new Error("Erro ao criar produto");

      alert("Produto cadastrado com sucesso!");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Erro ao criar produto.");
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Adicionar Produto</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
              fieldErrors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Ex: Ração Premium"
          />
          {fieldErrors.name && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preço (R$)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
              fieldErrors.price
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Ex: 59.90"
            step="0.01"
            min="0"
          />
          {fieldErrors.price && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL da Imagem
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
              fieldErrors.imageUrl
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="https://exemplo.com/imagem.jpg"
          />
          {fieldErrors.imageUrl && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.imageUrl}</p>
          )}
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition"
          >
            <PlusCircle size={18} /> Cadastrar Produto
          </button>

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
