import { Routes, Route } from "react-router-dom";

// Page imports
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import EventForm from "./components/form/EventForm";
import EventsList from "./components/EventsList";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Access from "./pages/Access";

// test
import PlaceSearch from "./pages/test/PlaceSearch";
import Voting from "./pages/test/Voting";

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
    const updatedEventsList = eventsList.filter((_, i) => i !== index);
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
    <Routes>
      <Route path="/" element={<Access />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test/searchplace" element={<PlaceSearch />} />
      <Route path="/test/Voting" element={<Voting />} />
    </Routes>
  );
}

export default App;
