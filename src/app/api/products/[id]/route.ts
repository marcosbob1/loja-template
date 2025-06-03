import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Atualizar produto (PUT)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const body = await req.json();
  const { name, price, imageUrl } = body;

  if (!name || !price || !imageUrl) {
    return NextResponse.json(
      { error: "Campos obrigatórios ausentes" },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: parseFloat(price),
        imageUrl: imageUrl,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar produto" },
      { status: 500 }
    );
  }
}
// Excluir produto (DELETE)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return NextResponse.json(
      { error: "Erro ao excluir produto" },
      { status: 500 }
    );
  }
}
