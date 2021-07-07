import React from 'react';

export const Spinner = ({ text }) => {
    return (
        <div>
            <span className="spinner" role="status"></span>
            {text}
        </div>
    )
}