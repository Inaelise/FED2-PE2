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
    <div>
      <span>
        <Search strokeWidth={1.5} />
      </span>
      <input
        type="text"
        value={searchInput}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
}
