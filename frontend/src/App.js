import { Routes, Route } from "react-router-dom";

// Page imports
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import EventForm from "./components/form/EventForm";
import EventsList from "./components/EventsList";
import Login from "./pages/Login";
import Access from "./pages/Access";

import Signup from "./pages/Signup";

// test
import PlaceSearch from "./pages/test/PlaceSearch";
import MenuPlaceSearch from "./pages/test/MenuPlaceSearch";
import Voting from "./pages/test/Voting";
import SignupForm from "./components/form/SignUpForm";
import ViewEventVotes from "./pages/test/ViewEventVotes";

import Header from "./components/layout/Header";

import axios from 'axios';
import { auth } from "./config/firebase";
import server from "./utils/constants/server";

function App() {

  const [eventsList, setEventsList] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  let uid = auth.currentUser.uid;

  const handleSaveEvent = async (event) => {
    console.log(`UID: ${uid}`);

    if (event.name && event.description) {

      try {
        const saveEvent_url = server.url + `/events`;
        // Send eventWithUid in the POST request
        const response = await axios.post(saveEvent_url, event);
        console.log("Response data:", response.data); // Log to check received data
        const updatedRecipeList = [...eventsList, response.data];
        setEventsList(updatedRecipeList);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 5000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const deleteEvent_url = server.url + `/events/${id}`;
      const response = await axios.delete(deleteEvent_url);

      if (response.status === 200) {
        const updatedEventsList = eventsList.filter(event => event.event_id !== id);
        setEventsList(updatedEventsList);
      } else {
        throw new Error('Event deletion was not successful');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getEvents_url = server.url + `/events/`;
        const response = await axios.get(getEvents_url);
        setEventsList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {showSuccessMessage &&
        <div
          className="px-4 py-2 text-center bg-red-500 text-white rounded-md hover:bg-red-800"
        >
          Event Added!
        </div>}
      <Routes>
        <Route path="/" element={<Access />} />
        <Route
          path="/eventform"
          element={<EventForm
            title="Create Event"
            onSave={handleSaveEvent}
            uid={uid} />}
        />
        <Route
          path="/eventslist"
          element={
            <EventsList
              eventsList={eventsList}
              onDelete={handleDeleteEvent}
              onSave={handleSaveEvent}
              uid={uid}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              eventsList={eventsList}
              onDelete={handleDeleteEvent}
              onSave={handleSaveEvent}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test/searchplace" element={<PlaceSearch />} />
        <Route path="/test/menusearchplace" element={<MenuPlaceSearch />} />
        <Route path="/test/voting" element={<Voting uid="uid1" eid={1} />} />
      </Routes>
    </div>
  );
}

export default App;
