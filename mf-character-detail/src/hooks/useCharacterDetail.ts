import { useEffect, useState } from "react";
import { getCharacterById, getEpisodesByUrls } from "../services/services";
import { Character, Episode } from "../types/character";

export const useCharacterDetail = (id: string) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    if (!id) {
      setError("ID no encontrado");
      setLoading(false);
      return;
    }

    getCharacterById(id)
      .then(async (char) => {
        setCharacter(char);
        const eps = await getEpisodesByUrls(char.episode);
        setEpisodes(eps);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { character, episodes, loading, error };
};
