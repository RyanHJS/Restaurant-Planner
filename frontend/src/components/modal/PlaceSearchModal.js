import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import axios from "axios";
import server from "../../utils/constants/server";
import PlacesSearchBar from "../searchbar/placeSearchBar";

export default function PlaceSearchModal({ show, onHide, setSelected }) {
  const [placeId, setPlaceId] = useState("");
  const [restaurantInfo, setRestaurantInfo] = useState({}); // Todo: Form should establishes this info

  useEffect(() => {
    async function retrieveRestaurantInfo() {
      try {
        let response = await axios.get(
          server.url + "/googleMaps/details/" + placeId
        );
        console.log("restaurant info: " + JSON.stringify(response.data));
        setRestaurantInfo({ placeId: placeId, ...response.data });

        setSelected({ placeId: placeId, ...response.data });
        onHide();
      } catch (e) {
        console.log(e);
        // onHide();
      }
    }

    if (placeId.length > 0) {
      retrieveRestaurantInfo();
    }
  }, [placeId]);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>Select a place to add it</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-5">
          <PlacesSearchBar setPlace={setPlaceId} />
        </Modal.Body>
      </Modal>
    </>
  );
}
