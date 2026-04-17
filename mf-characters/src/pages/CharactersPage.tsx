import { useState, useMemo } from "react";
import { useCharacters } from "../hooks/useCharacter";
import { CharacterCard } from "../components/CharacterCard";

type FilterBy = "name" | "status" | "species";

type CharactersPageProps = {
  filterBy: FilterBy;
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>;
};

export const CharactersPage = ({ filterBy }: CharactersPageProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, totalPages, loading, error } = useCharacters(page);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((char) =>
      char[filterBy].toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search, filterBy]);

  if (loading)
    return (
      <p className="text-green-400 animate-pulse col-span-full text-center py-20">
        Cargando personajes...
      </p>
    );

  if (error)
    return (
      <p className="text-red-400 col-span-full text-center py-20">{error}</p>
    );

  return (
    <>
      {/* Search input */}
      <div className="col-span-full flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Buscar por ${filterBy}...`}
          className="w-full max-w-md bg-gray-900 border border-green-500/40 text-green-100 placeholder-gray-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
        />
      </div>

      {/* Resultados */}
      {filtered.length === 0 ? (
        <p className="col-span-full text-center text-gray-500 py-10">
          No se encontraron personajes 👽
        </p>
      ) : (
        filtered.map((char) => <CharacterCard key={char.id} character={char} />)
      )}

      {/* Paginación */}
      <div className="col-span-full flex justify-center items-center gap-4 pt-4 pb-2.5">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-gray-900 border border-green-500/30 text-green-300 text-sm hover:border-green-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Anterior
        </button>

        <span className="text-sm text-gray-400">
          Página <span className="text-black font-bold">{page}</span> de{" "}
          <span className="text-black font-bold">{totalPages}</span>
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-900 border border-green-500/30 text-green-300 text-sm hover:border-green-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Siguiente →
        </button>
      </div>
    </>
  );
};
