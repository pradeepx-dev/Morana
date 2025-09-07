import { Link } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react"; // nice modern icon (install: npm install lucide-react)

function Header() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/?search=${search}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-blue-400">
          Morano
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex w-1/2 max-w-md">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 bg-blue-600 rounded-r-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Future Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/" className="hover:text-blue-400">Genres</Link>
          <Link to="/" className="hover:text-blue-400">About</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
