import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import UtilityButton from '../button/UtilityButton';

const EventForm = ({ title, onSave, event: initialEvent = {} }) => {

    const [event, setEvent] = useState({
        name: initialEvent.event_name || '',
        description: initialEvent.event_description || '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setEvent({
            name: initialEvent.event_name || '',
            description: initialEvent.event_description || '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!event.name || !event.description) {
            setError('Please enter all fields');
            return;
        }

        setError('');

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
                            type='button'
                            onClick={handleSubmit}
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