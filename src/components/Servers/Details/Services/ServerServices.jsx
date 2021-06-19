import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

export const ServerServices = (props) => {
    return (
        <div className="main">
            <div className="header header-servers-details">
                <div className="header-btn">
                    <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/info`} className="btn">
                        Инфо
                    </Link>
                    <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/services`} className="btn bg-gold text-dark">
                        Службы
                    </Link>
                    <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/processes`} className="btn">
                        Процессы
                    </Link>
                </div>
                <div className="header-h">
                {props.match.params.name}
                </div>
                <div className="header-input">
                    <input type="search" className="w-100"
                        placeholder="Search server ..." />
                </div>
            </div>
            <div className="content">
                <div className="sc-i-list">
                    <div className="sc-items-header">
                        <div className="sc-i-name">Name</div>
                        <div className="sc-i-display-name">Display name</div>
                        <div className="sc-i-state">State</div>
                        <div className="sc-i-user">User</div>
                        <div className="sc-i-actions">Actions</div>
                    </div>
                    <div className="sc-items">
                        <div className="sc-i">
                            <div className="sc-i-name">Anydesk</div>
                            <div className="sc-i-display-name">Энидеск</div>
                            <div className="sc-i-state">Running</div>
                            <div className="sc-i-user">FSDTGWEGFWEFWEF</div>
                            <div className="sc-i-actions actions-btn">
                                <button></button>
                                <button></button>
                                <button></button>
                            </div>
                        </div>
                        <div className="sc-i">
                            <div className="sc-i-name">Anydesk</div>
                            <div className="sc-i-display-name">Энидеск</div>
                            <div className="sc-i-state">Running</div>
                            <div className="sc-i-user">SYSTEM</div>
                            <div className="sc-i-actions actions-btn">
                                <button></button>
                                <button></button>
                                <button></button>
                            </div>
                        </div>
                        <div className="sc-i">
                            <div className="sc-i-name">Anydesk</div>
                            <div className="sc-i-display-name">Энидеск</div>
                            <div className="sc-i-state">Running</div>
                            <div className="sc-i-user">SYSTEM</div>
                            <div className="sc-i-actions actions-btn">
                                <button></button>
                                <button></button>
                                <button></button>
                            </div>
                        </div>
                        <div className="sc-i">
                            <div className="sc-i-name">Anydesk</div>
                            <div className="sc-i-display-name">Энидеск</div>
                            <div className="sc-i-state">Running</div>
                            <div className="sc-i-user">SYSTEM</div>
                            <div className="sc-i-actions actions-btn">
                                <button></button>
                                <button></button>
                                <button></button>
                            </div>
                        </div>
                        <div className="sc-i">
                            <div className="sc-i-name">Anydesk</div>
                            <div className="sc-i-display-name">Энидеск</div>
                            <div className="sc-i-state">Running</div>
                            <div className="sc-i-user">SYSTEM</div>
                            <div className="sc-i-actions actions-btn">
                                <button></button>
                                <button></button>
                                <button></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}