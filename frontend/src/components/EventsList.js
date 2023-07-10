import React, { useState } from 'react';
import Card from "./card/Card";

/*
Author: Ryan
Utility component to display list of events as cards.
Users/Hosts should be able to click into each card to reveal more information
*/

const EventsList = ({ eventsList, onDelete, onSave, onUpdate }) => {

    return (
        <div className="mt-10 text-center">
            {eventsList.length > 0 && <h2 className="text-2xl mb-4">Events List</h2>}
            {eventsList.length === 0 ? (
                <p>No events available</p>
            ) : (
                <ul>
                    {eventsList.map((savedEvent, index) => (
                        <li key={index}>
                            <Card
                                event={savedEvent}
                                onDelete={() => onDelete(index)}
                                onSave={onSave}
                                onUpdate={(updatedEvent) => onUpdate(updatedEvent, index)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventsList;