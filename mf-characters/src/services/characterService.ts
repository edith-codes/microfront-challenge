import { CharacterApiResponse } from "../types/character";

export const getCharacterApi = async (page: number = 1): Promise<CharacterApiResponse> => {
  const url = new URL("https://rickandmortyapi.com/api/character");
  url.searchParams.set("page", String(page));
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Error fetching characters");
  return response.json();
};