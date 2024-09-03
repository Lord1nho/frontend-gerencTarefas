"use client"; // Adiciona essa linha para marcar o componente como um Client Component

import { useRouter } from "next/navigation"; // Importa useRouter do next/navigation
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/Login"); // Redireciona para a página de login
  }, [router]);

  return null;
}