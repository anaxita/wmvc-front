import React from 'react';

export const FixedError = ({err}) => {
    return (
        <div className="text-light bg-danger p-1 rounded my-fixed-error" style={{ zIndex: 2 }}>
            {err}
        </div>
    )
}