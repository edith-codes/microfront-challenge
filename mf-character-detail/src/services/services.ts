import { Character, Episode } from "../types/character";

export const getCharacterById = async (id: string): Promise<Character> => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!response.ok) throw new Error("Error fetching character");
  return response.json();
};

export const getEpisodesByUrls = async (urls: string[]): Promise<Episode[]> => {
  const requests = urls.map((url) => fetch(url).then((r) => r.json()));
  return Promise.all(requests);
};