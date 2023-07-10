import React, { useState } from 'react';
import EditEvent from '../EditEvent';

/*
Author: Ryan
Utility component to render cards.
*/

const Card = ({ event, onDelete, onSave }) => {

    // Expanded State
    const [expanded, setExpanded] = useState(false);

    // Editing State
    const [editing, setEditing] = useState(false);
    // Edited Event State
    const [editedEvent, setEditedEvent] = useState(event);

    // Helper function to handle expand or collapse
    const handleCardClick = () => {
        setExpanded(!expanded);
    };

    // Helper function to handle edit event in expanded view
    const handleEdit = (e) => {
        setEditing(true);
        setEditedEvent(e);
    };

    // Helper function to handle save in editing view
    const handleCancelEdit = () => {
        setEditing(false);
    };

    const handleSaveEvent = (updatedEvent) => {
        setEditedEvent(updatedEvent);
        setEditing(false);
        onSave(editedEvent);
    };

    return (
        <div className="Card">
            <div
                className="EventCardContent rounded-lg p-6 bg-white cursor-pointer"
                onClick={handleCardClick}
            >
                <h2>Event Name: {event.name}</h2>
                {expanded && (
                    <div>
                        <p>Description: {event.description}</p>
                        <div className="EventCardButtons flex justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 px-10 py-2 text-white rounded-md"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 px-10 py-2 text-white rounded-md"
                                onClick={onDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {editing && (
                <EditEvent event={editedEvent} onSave={onSave} onCancel={handleCancelEdit} editing={editing} />
            )}
        </div>
    );
};

export default Card;