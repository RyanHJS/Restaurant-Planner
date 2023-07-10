import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';

/*
Author: Ryan
Utility component as an event sign up form.
Users/Hosts will be able to create an event with the following information:
    1. Event Name
    2. Event Description
*/

const EventForm = ({ title, event: initialEvent = {}, onSave }) => {

    // Event state
    const [event, setEvent] = useState({
        name: initialEvent.name || '',
        description: initialEvent.description || '',
        // date: '',
        // time: '',
        // location: '',
        // maxAttendees: '',
        // tags: '',
        // comments: '',
    });

    // Error state
    const [error, setError] = useState("");

    // Load the event data from local storage
    useEffect(() => {
        const saved_event = localStorage.getItem('saved_event');
        if (saved_event) {
            setEvent(JSON.parse(saved_event));
        }
    }, []);

    // Helper function to handle changes to the event state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    // Helper function to handle reset 
    const handleReset = () => {
        setEvent({
            name: '',
            description: '',
            // date: '',
            // time: '',
            // location: '',
            // maxAttendees: '',
            // tags: '',
            // host: '',
            // comments: '',
        });
    };

    // Helper function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!event.name || !event.description) {
            setError("Please enter a name and description for your event.");
            return;
        }

        setError(""); // Clear the error message if the event is valid

        localStorage.setItem('saved_event', JSON.stringify(event));
        onSave(event);
        handleReset();
    };

    return (
        <div className='mt-10 text-center'>
            <h2 className="text-2xl mb-4">{title}</h2>
            <div className="EventForm w-full max-w-lg justify-center">
                <div className="rounded-lg p-6 bg-white">
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Name"
                            id="name"
                            name="name"
                            value={event.name}
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Description"
                            id="description"
                            name="description"
                            value={event.description}
                            onChange={handleChange}
                        />

                        <div className="flex justify-between">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                type="submit"
                            >
                                Save
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                type="reset"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>

                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventForm;