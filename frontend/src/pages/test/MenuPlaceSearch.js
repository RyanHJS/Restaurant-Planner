import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
// import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/esm/Stack";
import ListGroup from "react-bootstrap/ListGroup";
// import Container from "react-bootstrap/esm/Container";
// import { GrAdd } from "react-icons/gr";
import { TfiPlus } from "react-icons/tfi";

import PlaceSearchModal from "../../components/modal/PlaceSearchModal";

function MenuPlaceSearch(props) {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const [selection, setSelected] = useState(null);

  const handleAddPlace = () => {
    setShowSearchMenu(true);
  };

  const handleModalClose = () => {
    setShowSearchMenu(false);
  };

  useEffect(() => {
    if (!showSearchMenu && selection !== null) {
      setSelectedPlaces([...selectedPlaces, selection]);
      console.log("selected place: ", selection);
    }
  }, [selection]);

  return (
    <>
      <Stack gap={3} className="col-md-5 mx-auto mt-5">
        <Button className="w-50" onClick={handleAddPlace}>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <TfiPlus />
            <span className="ml-2">Add a place</span>
          </span>
        </Button>

        <ListGroup variant="flush" className=" align-content-center">
          {selectedPlaces.map((place, index) => {
            return (
              <ListGroup.Item key={index}>
                <p>name: {place.name}</p>
                <p>rating: {place.rating}</p>
                <p>address: {place.formatted_address}</p>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Stack>

      <PlaceSearchModal
        show={showSearchMenu}
        onHide={handleModalClose}
        setSelected={setSelected}
      />
    </>
  );
}

export default MenuPlaceSearch;
