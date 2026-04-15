"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { LogoutButton } from "./components/LogoutButton";

interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      try {
        const { data: session } = await authClient.getSession();
        if (session?.user) {
          setUser(session.user as User);
        }
      } catch (error) {
        console.error("Erro ao buscar sessão:", error);
      } finally {
        setLoading(false);
      }
    }

    getSession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-white mb-8">Demo Auth</h1>

        {user ? (
          <div className="space-y-4">
            <div className="text-green-400 text-lg font-semibold">
              ✓ Logado
            </div>
            {user.image && (
              <img
                src={user.image}
                alt={user.name}
                className="w-16 h-16 rounded-full mx-auto border-2 border-green-400"
              />
            )}
            <div className="text-gray-300 space-y-1">
              <p className="text-sm text-gray-400">Nome:</p>
              <p className="text-lg font-semibold text-white">{user.name}</p>
              <p className="text-sm text-gray-400 mt-2">Email:</p>
              <p className="text-lg text-white">{user.email}</p>
            </div>
            <LogoutButton />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-300 mb-6">Você não está logado.</p>
            <button
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "github",
                  callbackURL: "/",
                });
              }}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition font-semibold"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.891 1.529 2.341 1.544 2.914 1.19.092-.926.349-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.167 20 14.42 20 10c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
              Entrar com GitHub
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
