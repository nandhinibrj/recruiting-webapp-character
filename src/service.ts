import { CharacterSheet } from "types/model";

export class CharacterSheetAPIService {
  public async getCharactersheet(): Promise<Response> {
    const response = await fetch(
      `https://recruiting.verylongdomaintotestwith.ca/api/{nandhinibrj}/character`
    );
    return await response.json();
  }

  public async updateCharacterSheet(results: CharacterSheet[]) {
    const response = await fetch(
      `https://recruiting.verylongdomaintotestwith.ca/api/{nandhinibrj}/character`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results }),
      }
    );
    return await response.json();
  }
}
