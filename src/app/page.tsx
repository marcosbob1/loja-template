"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra vermelha superior */}
      <div className="bg-red-600 text-white text-sm py-2 px-4 flex gap-4 justify-center">
        <a href="#">Atendimento</a>
        <a href="#">Quem Somos</a>
        <a href="#">Compra Segura</a>
        <a href="#">Como Comprar</a>
        <a href="#">Perguntas Frequentes</a>
        <a href="#">Política de Entrega</a>
      </div>

      {/* Cabeçalho principal */}
      <header className="bg-white py-4 px-6 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-red-600">FETTI</div>

          {/* Barra de busca */}
          <div className="flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Faça uma pesquisa..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Login e Carrinho */}
          <div className="flex items-center gap-6 text-sm text-gray-700">
            <a href="#" className="hover:underline">
              <span className="font-semibold">Entre</span> ou{" "}
              <span className="font-semibold">Cadastre-se</span>
            </a>
            <a href="#" className="relative">
              🛒
            </a>
          </div>
        </div>
      </header>

      {/* Menu de categorias */}
      <nav className="bg-gray-100 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-center gap-6 text-sm text-gray-700">
          {[
            "Lançamentos",
            "Frigideiras",
            "Conjuntos",
            "Caçarolas",
            "Tampas",
            "Acessórios",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-red-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Banner principal*/}
      <section className="relative w-full h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/banner.jpg"
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" />
        </div>
      </section>

      {/* Produtos da API */}
      <section className="p-4">
        <h3 className="text-lg font-semibold mb-2">Produtos em destaque</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow p-4 rounded-xl flex flex-col items-center gap-2"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h4 className="text-md font-semibold text-center text-neutral-900">
                {product.name}
              </h4>
              <p className="text-sm text-gray-600">
                R$ {product.price.toFixed(2)}
              </p>
              <button className="mt-auto bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
                Comprar
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
