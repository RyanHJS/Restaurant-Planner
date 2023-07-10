import React, { useState, useEffect } from "react";
import axios from "axios";

// my imports
import PlacesSearchBar from "../../components/searchbar/placeSearchBar";

import server from "../../utils/constants/server";

/**
 * An example of how to implement the PlacesSearchBar component
 */
export default function PlaceSearch() {
  const [placeId, setPlaceId] = useState("");
  const [restaurantInfo, setRestaurantInfo] = useState({}); // Form should establishes this info
  // const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function retrieveRestaurantInfo() {
      try {
        let response = await axios.get(
          server.url + "/googleMaps/details/" + placeId
        );
        console.log("restaurant info: " + JSON.stringify(response.data));
        setRestaurantInfo({ placeId: placeId, ...response.data });
      } catch (e) {
        console.log(e);
      }
    }

    if (placeId.length > 0) {
      retrieveRestaurantInfo();
    }
  }, [placeId]);

  return (
    <>
      {/* <p>Hello this is testing the Place Search Bar</p>
      <p>The selected place is {placeId}</p> */}
      <PlacesSearchBar setPlace={setPlaceId} />
      <div>
        <p>{restaurantInfo.name}</p>
        <p>{restaurantInfo.formatted_address}</p>
      </div>
    </>
  );
}
