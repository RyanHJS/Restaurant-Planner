import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/esm/Stack";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/esm/Container";

import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

import axios from "axios";
import server from "../../src/utils/constants/server";
import EventList from "../components/list/EventList";

const DEFAULT_TAB_SELECTION = "invitedEvents";

function Home(props) {
  const [name, setName] = useState("");
  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const [tabSelect, setTabSelect] = useState(DEFAULT_TAB_SELECTION);

  useEffect(() => {
    async function retrieveName() {
      try {
        let uid = auth.currentUser.uid;
        let response = await axios.get(server.url + `/users/name/${uid}`);
        let data = response.data;
        setName(data.firstname + " " + data.lastname);
      } catch (err) {
        console.log(err);
      }
    }

    if (name.length === 0) {
      retrieveName();
    }
  }, []);

  useEffect(() => {
    async function retrieveEvents(type) {
      try {
        let uid = auth.currentUser.uid;
        console.log("uid: ", uid);
        let response = await axios.get(
          server.url + `/events/list/${type}/${uid}`
        );
        console.log(response.data);

        setEvents(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (auth.currentUser) {
      let listType = tabSelect === "invitedEvents" ? "invited" : "hosted";
      retrieveEvents(listType);
    }
  }, [tabSelect]);

  const handleCreateEvent = () => {
    navigate("/eventform"); // TODO: front-end route to create event form
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-100 bg-primary-subtle">
        <h1 className="display-3 text-center p-3">Restaurant Planner</h1>
      </div>

      <Container className="d-flex justify-content-end">
        <Row className="mt-1">
          <Button
            type="button"
            className="btn btn-danger"
            onClick={handleSignOut}
          >
            Log Out
          </Button>
        </Row>
      </Container>

      <div className="d-flex justify-content-center">
        <Row className="mt-5">
          <h2>Welcome, {name}!</h2>
        </Row>
      </div>

      <Container className="d-flex justify-content-center">
        <Row className="mt-5 w-25">
          <Button
            type="button"
            className="btn-lg btn-info"
            onClick={handleCreateEvent}
          >
            Host an event
          </Button>
        </Row>
      </Container>

      <div className="container mt-5">
        <h3 className="mt-5 mb-5">My Events</h3>
        <Tabs
          defaultActiveKey="invitedEvents"
          id="justify-tab-example"
          className="mb-3"
          justify
          onSelect={(e) => setTabSelect(e)}
        >
          <Tab eventKey="invitedEvents" title="Invited Events">
            <EventList isOwnHost={true} data={events} />
          </Tab>
          <Tab eventKey="personalEvents" title="Your Hosted Events">
            <EventList isOwnHost={false} data={events} />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default Home;
