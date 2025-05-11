import { Search } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Search bar component that allows users to enter a search query.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} onSearch - Function to handle search input changes.
 * @param {string} query - Current query to sync with the search input.
 * @returns  {JSX.Element} - The rendered component.
 */
export default function SearchBar({ onSearch, query }) {
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    if (query !== searchInput) {
      setSearchInput(query);
    }
  }, [query, searchInput]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <span className="absolute top-2 left-1.5 text-orange">
        <Search size={20} strokeWidth={2.5} />
      </span>
      <input
        className="bg-white rounded-full py-2 w-[230px] px-6 text-sm font-inter text-center sm:w-[350px] focus:outline-green"
        type="text"
        value={searchInput}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
}
