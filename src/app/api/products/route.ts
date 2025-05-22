import { NextResponse } from 'next/server'

export async function GET() {
  const products = [
    {
      id: 1,
      name: 'Frigideira Antiaderente',
      price: 89.90,
      image: '/produtos/frigideira.jpg', // ou uma URL externa
    },
    {
      id: 2,
      name: 'Tampas de Vidro',
      price: 149.90,
      image: '/produtos/tampa.jpg',
    },
    {
      id: 3,
      name: 'Conjunto de Panelas',
      price: 299.90,
      image: '/produtos/conjunto.jpg',
    },
  ]

  return Response.json(products)
}


