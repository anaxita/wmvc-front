import React from 'react';

export const FixedError = ({err}) => {
    return (
        <div className="text-light bg-danger p-1 roundedr" style={{ zIndex: 2 }}>
            {err}
        </div>
    )
}