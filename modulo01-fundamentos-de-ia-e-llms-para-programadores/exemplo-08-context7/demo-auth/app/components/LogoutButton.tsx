"use client";

import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await authClient.signOut();
        window.location.reload();
      }}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
    >
      Sair
    </button>
  );
}
