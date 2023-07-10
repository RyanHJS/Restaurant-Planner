import { Routes, Route } from "react-router-dom";

// Page imports
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import EventForm from "./components/form/EventForm";
import EventsList from "./components/EventsList";

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

  // Load the events data from local storage
  useEffect(() => {
    const storedEventsList = localStorage.getItem("eventsList");
    if (storedEventsList) {
      setEventsList(JSON.parse(storedEventsList));
    }
  }, []);

  return (

    <div className="bg-gray-200 flex flex-col items-center justify-center h-screen">
      <EventForm title="Create Event" onSave={handleSaveEvent} />
      <EventsList eventsList={eventsList} onDelete={handleDeleteEvent} onSave={handleSaveEvent} />
    </div>

    // <Routes>
    //   <Event />
    //   <Route path="/" element={<Home />} />
    // </Routes>
  );
}

export default App;
