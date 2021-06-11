import React from 'react';

export const ErrorAbsolute = ({err}) => {
    return (
        <div className="err-shadow">
            <div className="err" role="alert">
                {err}
            </div>
        </div>
    )
}