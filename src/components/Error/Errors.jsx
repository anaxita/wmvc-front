import React from 'react';

export const Error = ({err}) => {
    return (
        <div className="text-red err" role="alert">
            {err}
        </div>
    )
}