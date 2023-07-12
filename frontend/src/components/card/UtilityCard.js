import React, { useState } from 'react';
import EditEvent from '../EditEvent';

/*
Author: Ryan
Utility card component
Receives props from parent components
Parent components can be a list, etc...
*/

const UtilityCard = ({ event, onDelete, onSave, onUpdate }) => {

    const [expanded, setExpanded] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState(event);

    const handleCardClick = () => {
        setExpanded(!expanded);
    };

    const handleEdit = (e) => {
        setEditing(true);
        setEditedEvent(e);
    };

    const handleCancelEdit = () => {
        setEditing(false);
    };

    const handleDelete = () => {
        onDelete(event.id);
    };

    const handleSaveEvent = (updatedEvent) => {
        setEditedEvent(updatedEvent);
        setEditing(false);
        onUpdate(event.id, updatedEvent);
    };

    return (
        <div className="Card">
            <div
                className="EventCardContent rounded-lg p-6 bg-white cursor-pointer"
                onClick={handleCardClick}
            >
                <h2>Event Name: {event.event_name}</h2>
                {expanded && (
                    <div>
                        <p>Description: {event.event_description}</p>
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
            {/* {editing && (
                <EditEvent event={editedEvent} onEditSave={handleSaveEvent} onCancel={handleCancelEdit} editing={editing} />
            )} */}
        </div>
    );
};

export default UtilityCard;