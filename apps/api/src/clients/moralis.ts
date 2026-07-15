const MORALIS_BASE_URL = "https://deep-index.moralis.io/api/v2.2";

export class MoralisClient {
  constructor(private readonly apiKey: string) {}

  async getNativeBalance(address: string): Promise<string> {
    const response = await fetch(
      `${MORALIS_BASE_URL}/${address}/balance?chain=eth`,
      { headers: { "X-API-Key": this.apiKey } }
    );

    if (!response.ok) {
      throw new Error(`Moralis error: ${response.status}`);
    }

    const json = (await response.json()) as { balance: string };
    const wei = BigInt(json.balance);
    return (Number(wei) / 1e18).toFixed(6);
  }
}