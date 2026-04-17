import { Character } from "../types/character";

const statusColor: Record<string, string> = {
  Alive: "bg-green-400",
  Dead: "bg-red-500",
  unknown: "bg-gray-500",
};

export const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <div
      onClick={() => (window.location.href = `/character/${character.id}`)}
      className="cursor-pointer bg-gray-900 border border-green-500/20 rounded-xl overflow-hidden shadow-md hover:shadow-green-500/20 hover:border-green-400/50 hover:-translate-y-1 transition-all duration-200"
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h5 className="text-lg font-bold text-white leading-tight">
          {character.name}
        </h5>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span
            className={`w-2.5 h-2.5 rounded-full ${statusColor[character.status] ?? "bg-gray-500"}`}
          />
          <span>
            {character.status} — {character.species}
          </span>
        </div>

        <span className="text-xs text-gray-500">{character.gender}</span>
      </div>
    </div>
  );
};
