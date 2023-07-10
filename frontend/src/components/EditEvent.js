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

const EditEvent = ({ event, onEditSave, onCancel, editing }) => {

    // Edited Event State
    const [editedEvent, setEditedEvent] = useState(event);

    // Helper function to handle save
    const handleSave = (event) => {
        onEditSave(event);
    };

    return (
        <div className="EditEvent">
            <h2>Edit Event</h2>
            <EventForm title="Edit Event" event={editedEvent} onSave={handleSave} />
        </div>
    );
};

export default EditEvent;
