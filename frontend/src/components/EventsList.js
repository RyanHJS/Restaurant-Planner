import React, { useState } from 'react';
import UtilityCard from './card/UtilityCard';

/*
Author: Ryan
Utility component to display list of events as cards.
Users/Hosts should be able to click into each card to reveal more information
*/

const EventsList = ({ eventsList, onDelete, onSave }) => {
    return (
        <div className='text-center'>
            {eventsList.length > 0 && <h2 className='text-2xl my-5'> Events List </h2>}
            {eventsList.length === 0 ?
                (<h2 className='text-2xl my-5'> No events available </h2>)
                :
                (
                    <ul>
                        {eventsList.map((event, index) => (
                            <li key={index}>
                                <UtilityCard
                                    event={event}
                                    onDelete={() => onDelete(event.event_id)}
                                    onSave={onSave}
                                />
                            </li>
                        ))}
                    </ul>
                )}

        </div>
    );
};

export default EventsList;