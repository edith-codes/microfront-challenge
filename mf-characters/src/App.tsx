// @ts-ignore
import "./index.css";
import React, { useState } from "react";
import { CharactersPage } from "./pages/CharactersPage";

type FilterBy = "name" | "status" | "species";

const selectClass =
  "bg-gray-900 border border-green-500/40 text-green-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 cursor-pointer";

const App = () => {
  const [filterBy, setFilterBy] = useState<FilterBy>("name");

  return (
    <div className="w-full flex flex-col gap-6">

      <div className="w-full flex justify-center gap-3 pt-2.5">
        <select
          className={selectClass}
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value as FilterBy)}
        >
          <option value="name">Nombre</option>
          <option value="status">Estado</option>
          <option value="species">Especie</option>
        </select>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CharactersPage filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>

    </div>
  );
};

export default App;