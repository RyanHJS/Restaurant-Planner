import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";

import { useNavigate } from "react-router-dom";
import EventsList from "../components/EventsList";

function Home({ eventsList, onDelete, onSave }) {
  const [name, setName] = useState("Tester React");

  const navigate = useNavigate();

  const handleHostEvent = () => {
    navigate("/createEvent"); // Todo: front-end route to create event form
  };

  return (
    <>
      <div className="w-100 bg-primary-subtle">
        <h1 className="display-3 text-center p-3">Restaurant Planner</h1>
      </div>

      <div className="d-flex justify-content-center">
        <Row className="mt-5">
          <h2>Welcome, {name}!</h2>
        </Row>
      </div>

      {/* <div className="d-flex justify-content-center">
        <Row className="mt-5">
          <Button type="button" className="btn btn-info p-3">
            Host an event
          </Button>
        </Row>
      </div> */}

      <div className="container mt-5 text-center">
        <h3>My Events</h3>
        {/* TODO: Make a list of events that user has */}
        <EventsList eventsList={eventsList} onDelete={onDelete} onSave={onSave} />
      </div>

    </>
  );
}

export default Home;
