import React from 'react';

export const SpinnerUsers = () => {
    return (
            <div className="position-absolute top-50 start-50 translate-middle">
                Загружаем список пользователей ...
                <div className="spinner" role="status">
            </div>
        </div>
    )
}