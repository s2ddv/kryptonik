const ALCHEMY_BASE_URL = "https://eth-mainnet.g.alchemy.com/v2";

export class AlchemyClient {
  constructor(private readonly apiKey: string) {}

  async getNativeBalance(address: string): Promise<string> {
    const response = await fetch(`${ALCHEMY_BASE_URL}/${this.apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [address, "latest"],
      }),
    });

    if (!response.ok) {
      throw new Error(`Alchemy error: ${response.status}`);
    }

    const json = (await response.json()) as { result: string };
    const wei = BigInt(json.result);
    return (Number(wei) / 1e18).toFixed(6);
  }
}