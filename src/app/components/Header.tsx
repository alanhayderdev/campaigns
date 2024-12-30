// components/Header.tsx
"use client";

import { signOut } from "next-auth/react";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
      <h1 className="text-xl font-semibold text-gray-800">Campaign Dashboard</h1>
      <button
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </header>
  );
}
