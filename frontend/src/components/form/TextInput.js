import React from 'react';

/*
Author: Ryan
Utility component for rendering a text input field.
*/

const TextInput = ({ label, name, id, value, onChange }) => {
    return (
        <div className="EventName mx-5 my-5 text-center">
            <label
                htmlFor={id}
                className="block text-md font-medium text-gray-700 mb-1"
            >
                {label}
            </label>

            <textarea
                className="resize rounded-md border border-black form-input max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                name={name}
                id={id}
                value={value}
                onChange={onChange}
            >
            </textarea>
        </div>
    );
};

export default TextInput;