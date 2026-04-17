import { useParams } from "react-router-dom";
import { useCharacterDetail } from "../hooks/useCharacterDetail";

export const CharacterDetailPage = () => {
  const { id } = useParams();
  const { character, episodes, loading } = useCharacterDetail(id);

  if (loading) return <p>Loading...</p>;
  if (!character) return <p>No data</p>;

  return (
    <div className="flex flex-col items-center gap-6">
      <img src={character.image} className="w-40 rounded-full" />
      <h1 className="text-2xl">{character.name}</h1>

      <h2 className="text-xl mt-6">Episodios</h2>
      <ul>
        {episodes.map((ep: any) => (
          <li key={ep.id}>
            {ep.name} - {ep.episode}
          </li>
        ))}
      </ul>
    </div>
  );
};