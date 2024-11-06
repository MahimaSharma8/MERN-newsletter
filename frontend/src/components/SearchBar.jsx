import React, { useState} from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
  
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/search", {
        params: { q: query },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="search-container p-4 bg-red-950">
      <form onSubmit={handleSearch} className="flex flex-row items-center space-x-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="search-input border rounded-lg p-2 w-full bg-vine"
        />
        <button type="submit" className="search-button p-2 text-white bg-red-900 rounded-lg">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="results mt-4">
        {results.length === 0 && !loading && <p>No results found.</p>}
        {results.map((result, index) => (
          <a href={`#${result.headline}`} className="text-white hover:text-white"><div key={index} className="result-item border-b p-4">
            <h3 className="text-xl font-semibold">{result.headline}</h3>
            <p>Author: {result.Author}</p>
            <p>{result.Textcontent[0]?.text}</p>
          </div>
          </a>
        ))}
      </div>
    </div >
  );
};

export default SearchBar;