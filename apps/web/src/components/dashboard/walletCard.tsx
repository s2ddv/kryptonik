"use client";

import { useState } from "react";
import { useWalletSummary } from "@/hooks/useWalletSummary";

export function WalletCard() {
  const [input, setInput] = useState("");
  const [address, setAddress] = useState<string | null>(null);
  const { data, isLoading, isError } = useWalletSummary(address);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAddress(input.trim());
  }

  return (
    <div className="bg-neutral-900 rounded-xl p-6 h-full flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-100">Wallet</h2>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="0x..."
          className="flex-1 bg-neutral-800 text-neutral-100 rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-neutral-700 text-neutral-100 rounded px-4 py-2 text-sm"
        >
          Buscar
        </button>
      </form>

      {isLoading && <p className="text-neutral-400 text-sm">Carregando...</p>}
      {isError && (
        <p className="text-red-400 text-sm">
          Endereço inválido ou erro ao buscar.
        </p>
      )}

      {data && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-neutral-800 rounded p-3">
            <p className="text-xs text-neutral-400 mb-1">Alchemy</p>
            <p className="text-neutral-100 text-sm">
              {data.alchemy ? `${data.alchemy.nativeBalance} ETH` : "indisponível"}
            </p>
          </div>
          <div className="bg-neutral-800 rounded p-3">
            <p className="text-xs text-neutral-400 mb-1">Moralis</p>
            <p className="text-neutral-100 text-sm">
              {data.moralis ? `${data.moralis.nativeBalance} ETH` : "indisponível"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}