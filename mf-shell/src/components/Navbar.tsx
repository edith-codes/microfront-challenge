const Navbar = () => (
  <header className="w-full bg-gray-900 border-b border-green-500/30 shadow-lg shadow-green-900/20">
    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🛸</span>
        <h1 className="text-xl font-extrabold tracking-wide pr-2.5">
          <span className="text-green-400">Rick</span>
          <span className="text-white"> & </span>
          <span className="text-cyan-400">Morty</span>
        </h1>
      </div>

      <nav className="flex gap-6 text-sm font-semibold text-gray-400">
        
          <a href="/"
          className="hover:text-green-400 transition-colors duration-200"
        >
          Personajes
        </a>
      </nav>
    </div>
  </header>
);

export default Navbar;