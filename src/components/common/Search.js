import React, { useState } from "react";
import Loading from "./Loading";
import { API_URL } from "../../config";
import { handleResponse } from "../../helpers";
import { withRouter } from "react-router-dom";
import "./Search.css";

const Search = props => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRedirect = currencyId => {
    props.history.push(`/currency/${currencyId}`);
    setSearchResults([]);
    setSearchQuery("");
  };
  const handleChangeInput = e => {
    const searchQuery = e.target.value;

    setSearchQuery(searchQuery);
    setLoading(true);
    if (!searchQuery) {
      return false;
    }
  };

  fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
    .then(handleResponse)
    .then(data => {
      setLoading(false);
      setSearchResults(data);
    });

  const renderSearchResults = () => {
    if (!searchQuery) {
      return false;
    }
    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map(result => {
            return (
              <div
                className="Search-result"
                key={result.id}
                onClick={() => handleRedirect(result.id)}
              >
                {result.name} ({result.symbol})
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div className="Search-result-container">
        <div className="Search-no-result">NO results found</div>
      </div>
    );
  };

  return (
    <div className="Search">
      <div>
        <span className="Search-icon" />
        <input
          type="text"
          className="Search-input"
          placeholder="Currency name"
          onChange={handleChangeInput}
          value={searchQuery}
        />
        {loading && (
          <div className="Search-loading">
            <Loading />
          </div>
        )}
      </div>
      {renderSearchResults()}
    </div>
  );
};

export default withRouter(Search);
