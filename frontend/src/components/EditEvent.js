import React, { useState } from 'react';
import EventForm from './form/EventForm';

/*
Author: Ryan
Utility component to allow HOSTS to edit an event
Hosts will be able to edit the following information:
    Event Name
    Event Description
    Event Date
    Event Time
    Event Location
    Event Max Attendees
    Event Tags
    Event Comments
*/

const EditEvent = ({ event, onSave, editing }) => {

    // Edited Event State
    const [editedEvent, setEditedEvent] = useState(event);

    // Helper function to handle changes to the edited event state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    // Helper function to handle save
    const handleSave = () => {
        onSave(editedEvent);
    };

    // Helper function to handle cancel
    const handleCancel = () => {
        editing = false;
    };

    return (
        <div className="EditEvent">
            <h2>Edit Event</h2>
        </div>
    );
};

export default EditEvent;