import { Search } from "lucide-react";
import { useState, useEffect } from "react";

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
