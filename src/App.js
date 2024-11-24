import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log(process.env);


function App() {
  const [quote, setQuote] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/random`);
      setQuote(response.data[0]);
      setError(null);
    } catch (err) {
      setError("Failed to fetch a random quote.");
    }
  };

  const searchQuotes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { q: searchQuery },
      });
      setSearchResults(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch search results.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Quotes App</h1>
      <button onClick={fetchRandomQuote}>Get Random Quote</button>
      {quote && (
        <div style={{ marginTop: "20px" }}>
          <h2>Random Quote</h2>
          <p>
            <strong>{quote.Quote}</strong> - {quote.Author}
          </p>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <h2>Search Quotes</h2>
        <input
          type="text"
          placeholder="Search for a quote or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchQuotes}>Search</button>
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <p>
                  <strong>{result.Quote}</strong> - {result.Author}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
