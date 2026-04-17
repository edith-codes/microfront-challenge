import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// @ts-ignore
const CharactersApp = React.lazy(() => import("characters/App"));
// @ts-ignore
const CharacterDetailApp = React.lazy(() => import("characterDetail/App"));

const CharacterDetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  return <CharacterDetailApp id={id} />;
};

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen flex flex-col bg-gray-950 text-white font-sans">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64 text-green-400 text-xl animate-pulse">
            Abriendo portal...
          </div>
        }>
          <Routes>
            <Route path="/" element={<CharactersApp />} />
            <Route path="/character/:id" element={<CharacterDetailWrapper />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;