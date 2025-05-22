import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loja Exemplo',
  description: 'Loja com Next.js, Tailwind e PostgreSQL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="container mx-auto">{children}</main>
        <footer className="bg-gray-100 text-center p-4 mt-8">
          <p className="text-sm">© 2025 Minha Loja. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  )
}