// @ts-ignore
import "./index.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useCharacterDetail } from "./hooks/useCharacterDetail";

const statusColor: Record<string, string> = {
  Alive: "bg-green-400",
  Dead: "bg-red-500",
  unknown: "bg-gray-500",
};

const App = ({ id }: { id: string }) => {
  const { character, episodes, loading, error } = useCharacterDetail(id);

  if (loading)
    return (
      <p className="text-green-400 animate-pulse text-center py-20">
        Cargando personaje...
      </p>
    );

  if (error || !character)
    return (
      <p className="text-red-400 text-center py-20">
        {error ?? "Personaje no encontrado"}
      </p>
    );

  return (
    <div className="w-full flex flex-col items-center gap-8 py-8">
      {/* Back */}
      <div className="w-full max-w-4xl">
        <button
          onClick={() => window.history.back()}
          className="text-sm text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
        >
          ← Volver
        </button>
      </div>

      <div className="w-full max-w-4xl bg-gray-900 border border-green-500/20 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
        <div className="md:w-64 md:min-h-full w-full h-64 shrink-0">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-6 flex flex-col gap-4">
          <h1 className="text-2xl font-extrabold text-white">
            {character.name}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span
              className={`w-2.5 h-2.5 rounded-full ${statusColor[character.status] ?? "bg-gray-500"}`}
            />
            <span>
              {character.status}
            </span>
            <span>
              {character.species}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mt-2">
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 uppercase text-xs tracking-widest">
                Género
              </span>
              <span className="text-white">{character.gender}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 uppercase text-xs tracking-widest">
                Origen
              </span>
              <span className="text-white">{character.origin.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 uppercase text-xs tracking-widest">
                Ubicación actual
              </span>
              <span className="text-white">{character.location.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 uppercase text-xs tracking-widest">
                Episodios
              </span>
              <span className="text-white">{episodes.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-3">
        <h2 className="text-lg font-bold text-green-400">Episodios</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className="bg-gray-900 border border-green-500/10 rounded-lg px-4 py-3 flex flex-col gap-1 hover:border-green-500/30 transition-colors"
            >
              <span className="text-xs text-green-400 font-mono">
                {ep.episode}
              </span>
              <span className="text-sm text-white font-medium">{ep.name}</span>
              <span className="text-xs text-gray-500">{ep.air_date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
