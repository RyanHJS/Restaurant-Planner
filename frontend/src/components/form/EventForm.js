import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import UtilityButton from '../button/UtilityButton';

/*
Author: Ryan
Form component for creating a new event
Receives props from App
    title - title of the form, can be a creation form or edit form
    onSave - the created recipe is saved to the localstorage 
    initialEvent - used to populate form fields with existing values if they exist

Logic:
    1. event state to store newly entered form values or existing form values
    2. error state to store error messages with regards to form validation
    3. handleChange function to update event state when form values change
    4. handleReset function to reset form values to initialEvent values
    5. handleSubmit function to validate form values and save to localstorage
*/

const EventForm = ({ title, onSave, event: initialEvent = {}, }) => {

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
    // useEffect(() => {
    //     const saved_event = localStorage.getItem('saved_event');
    //     if (saved_event) {
    //         setEvent(JSON.parse(saved_event));
    //     }
    // }, []);

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
            name: initialEvent.name || '',
            description: initialEvent.description || '',
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
        <div className='form-group my-5 text-center flex flex-col items-center justify-center'>
            <h2 className='text-2xl mb-4'>{title}</h2>
            <div className='form w-full max-w-lg justify-center rounded-lg p-6 bg-white'>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Name"
                        id="name"
                        name='name'
                        value={event.name}
                        onChange={handleChange}
                    />

                    <TextInput
                        label="Description"
                        id="description"
                        name='description'
                        value={event.description}
                        onChange={handleChange}
                    />

                    <div className='flex justify-between'>
                        <UtilityButton
                            bg_color="bg-blue-500"
                            text_color='text-white'
                            hover_color='hover:bg-blue-600'
                            type='submit'
                            text='Save'
                        />

                        <UtilityButton
                            bg_color="bg-gray-300"
                            text_color='text-gray-500'
                            hover_color='hover:bg-gray-400'
                            type='reset'
                            onClick={handleReset}
                            text='Reset'
                        />
                    </div>

                    {error && <p className="text-red-500 mt-2">{error}</p>}

                </form>

            </div>

        </div>
    );
};

export default EventForm;