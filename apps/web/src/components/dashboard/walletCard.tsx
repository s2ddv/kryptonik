"use client";

import { useWalletSummary } from "../../hooks/useWalletSummary";

export function WalletCard() {
  const address = null;
  const { data, isLoading, isError } = useWalletSummary(address);

  return (
    <div className="liquid-glass rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-100">Portfolio Overview</h2>
      </div>

      {isLoading && (
        <p className="text-neutral-400 text-sm">Loading Portfolio data...</p>
      )}

      {isError && (
        <p className="text-red-400 text-sm">Failed to load portfolio data.</p>
      )}

      {!address && !isLoading && (
        <p className="text-neutral-400 text-sm">
          Connect a Wallet to view balances.
        </p>
      )}

      {data && (
        <div className="space-y-3 text-sm text-neutral-300">
          <div>
            <p className="text-neutral-500">Address</p>
            <p className="font-mono break-all">{data.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-neutral-800/50 p-3">
              <p className="text-neutral-500">Alchemy</p>
              <p className="text-white font-medium">
                {data.alchemy?.nativeBalance ?? "—"}
              </p>
            </div>
            <div className="rounded-lg bg-neutral-800/50 p-3">
              <p className="text-neutral-500">Moralis</p>
              <p className="text-white font-medium">
                {data.moralis?.nativeBalance ?? "—"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}