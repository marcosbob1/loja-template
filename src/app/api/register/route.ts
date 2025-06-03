import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !name || !password) {
    return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
  }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Este e-mail já está cadastrado." },
        { status: 400 }
      );
    }

    // Criptografa a senha
    const hashedPassword = await hash(password, 10);

    // Cria o novo usuário
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

