import React from 'react';

/*
Utility button component
Receives props from parent components
Parent components can be a form, a card, etc...
 */

const UtilityButton = ({ text_color, bg_color, hover_color, type, onClick, text }) => {
    return (
        <button
            className={`px-4 py-2 rounded-md ${text_color} ${bg_color} ${hover_color}`}
            type={type ? type : null}
            onClick={onClick ? onClick : null}
        >
            {text}
        </button>
    );
};

export default UtilityButton;