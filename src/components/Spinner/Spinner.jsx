import React from 'react';

export const Spinner = ({text}) => {
    return (
            <div>
                {text}
                <div className="spinner" role="status">
            </div>
        </div>
    )
}