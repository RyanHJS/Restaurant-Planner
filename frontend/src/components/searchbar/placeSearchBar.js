import React, { useState, useMemo } from "react";

import PlacesAutocomplete from "react-places-autocomplete";

import Form from "react-bootstrap/Form";
// import {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from "react-places-autocomplete";

/**
 *  Search bar component for searching restaurants using Google Places API.
 * @param {*} setPlace - returns the call to a useState hook
 * @param {*} setVisible  - returns the call to a useState hook of the visbibility of
 * @returns
 */
export default function PlacesSearchBar({ setPlace, setVisible }) {
  const [input, setInput] = useState("");
  const [resultsExist, setResultsExist] = useState(false);

  const [placeId, setPlaceId] = useState("");

  const handleChange = (address) => {
    setInput(address);
    if (!resultsExist) {
      setResultsExist(true);
    } // might not be the best place to do this.
  };

  /**
    @params address: string, placeId: ?string, suggestion: ?object
    NOTE: `placeId` and `suggestion` are null when user hits Enter key with no suggestion item selected.
  */
  const handleSelect = (address, placeId, suggestion) => {
    setPlaceId(placeId);
    setPlace(placeId);
  };

  const onError = (status, clearSuggestions) => {
    console.log("Error: no predictions found", status);
    if (status === "ZERO_RESULTS") {
    }
    setResultsExist(false);
    clearSuggestions();
  };

  const searchOptions = {
    types: ["restaurant"],
    componentRestrictions: {
      country: "ca",
    },
    // fields: ["rating"],
  };

  return (
    <PlacesAutocomplete
      value={input}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={searchOptions}
      shouldFetchSuggestions={input.length > 1}
      onError={onError}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <Form.Control
            {...getInputProps({
              placeholder: "Search Restaurants...",
              className: "location-search-input",
            })}
            size="md"
            type="text"
          />

          {!resultsExist && input.length > 0 ? (
            <div>
              <span>No results found.</span>
            </div>
          ) : (
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    {/* todo: Make List layoutto show all suggestions*/}
                    <span>{suggestion.description}</span>
                    <p>{suggestion.placeId}</p>
                    <p>{suggestion.types}</p>
                    <p>rating: {suggestion.rating}</p>
                    {setPlaceId(suggestion.placeId)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
}