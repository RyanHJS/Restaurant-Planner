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

import Header from "./components/layout/Header";

function App() {
  /*
  Author: Ryan
  Utility components to handle state of events
  */

  // Events state - contains list of events
  const [eventsList, setEventsList] = useState([]);

  // Helper function to save events to localstorage
  const handleSaveEvent = (event) => {
    if (event.name && event.description) {
      const updatedEventsList = [...eventsList, event];
      setEventsList(updatedEventsList);
      localStorage.setItem("eventsList", JSON.stringify(updatedEventsList));
    }
  };

  // Helper function to delete events from localstorage
  const handleDeleteEvent = (index) => {
    const updatedEventsList = [...eventsList];
    updatedEventsList.splice(index, 1);
    setEventsList(updatedEventsList);
    localStorage.setItem("eventsList", JSON.stringify(updatedEventsList));
  };

  // Helper function to update events
  const handleUpdateEvent = (updatedEvent, index) => {
    const updatedEventsList = eventsList.map((event, i) =>
      i === index ? updatedEvent : event
    );
    setEventsList(updatedEventsList);
    localStorage.setItem("eventsList", JSON.stringify(updatedEventsList));
  };

  // Load the events data from local storage
  useEffect(() => {
    const storedEventsList = localStorage.getItem("eventsList");
    if (storedEventsList) {
      setEventsList(JSON.parse(storedEventsList));
    }
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Access />} />
        <Route
          path="/eventform"
          element={<EventForm title="Create Event" onSave={handleSaveEvent} />}
        />
        <Route
          path="/eventslist"
          element={
            <EventsList
              eventsList={eventsList}
              onDelete={handleDeleteEvent}
              onSave={handleSaveEvent}
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
        <Route path="/test/voting" element={<Voting />} />
      </Routes>
    </div>
  );
}

export default App;
