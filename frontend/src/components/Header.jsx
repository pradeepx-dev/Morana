import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/?search=${search}`;
    }
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Morano</Link>
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-l bg-gray-800 border border-gray-700"
        />
        <button type="submit" className="p-2 bg-blue-600 rounded-r">Search</button>
      </form>
    </header>
  );
}

export default Header;
