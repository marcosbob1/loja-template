import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: lista todos os produtos
export async function GET() {
  const products = await prisma.product.findMany()
  return NextResponse.json(products)
}

// POST: cadastra um novo produto
export async function POST(request: Request) {
  try {
    const { name, price, imageUrl } = await request.json()

    if (!name || !price || !imageUrl) {
      return NextResponse.json({ error: 'Dados obrigatórios faltando.' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        imageUrl,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao cadastrar produto.' }, { status: 500 })
  }
}


