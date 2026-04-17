import { useEffect, useState } from "react";
import { getCharacterApi } from "../services/CharacterService";
import { Character } from "../types/character";

export const useCharacters = (page: number) => {
  const [data, setData] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCharacterApi(page)
      .then((res) => {
        setData(res.results);
        setTotalPages(res.info.pages);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  return { data, totalPages, loading, error };
};