import React from 'react';

/*
Author: Ryan
Utility component for text input fields
Receives props from EventForm
    label - label for the input field (what attribute is being inputted)
    id - id for the input field
    name - name for the input field
    value - value for the input field
    onChange - onChange handler for the input field
 */

const TextInput = ({ label, id, name, value, onChange }) => {
    return (
        <div className='text-input-group mx-5 my-5 text-center'>
            <label
                className="block text-md font-medium text-gray-700 mb-1"
                htmlFor={label}
            >
                {label}
            </label>
            <textarea
                className="resize rounded-md border border-black form-input max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            >

            </textarea>
        </div>
    );
};

export default TextInput;