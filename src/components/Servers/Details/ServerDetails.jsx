import React from 'react';
import './style.css'

export const ServerDetails = ({ params, services, isLoading, error }) => {

    // const servicesList = services.map((el) => {
    //     return (
    //         Служба
    //     )
    // })
    return (
        <div className="main">
            <div className="header">
                <div className="header-btn">
                    <button type="button" className="btn" onClick={() => { }} >Инфо</button>
                    <button type="button" className="btn" onClick={() => { }}>Службы</button>
                    <button type="button" className="btn" onClick={() => { }}>Процессы</button>
                </div>
                <div className="header-h">
                    Свойства сервера
                </div>
                <div className="header-input">
                    <input type="search" className="w-100"
                        placeholder="Search server ..." />
                </div>
            </div>
            <div className="content params">
                <div>
                    <div className="params-item border-secondary">
                        HV: DCSRHV2
                    </div>
                    <div className="params-item border-secondary">
                        COMPANY: Промформат
                    </div>
                    <div className="params-item border-secondary">
                        IP: 182.175.23.4
                    </div>
                    <div className="params-item border-secondary">
                        CPU: 6
                    </div>
                    <div className="params-item border-secondary">
                        RAM: 2GB
                    </div>
                    <div className="params-item border-secondary">
                        DESCRIPTION: New server for bitrix games
                    </div>
                </div>
                <div className="disks border-secondary">
                    <ul>
                        <li className="disks-item">
                            <div className="disks-item-header">
                                Локальный диск C:
                            </div>
                            <div className="disks-item-body">
                                <input type="range" min="0" max="100" value="75" id="disk-c" />
                            </div>
                            <div className="disks-item-footer">
                                25 ГБ свободно из 100 ГБ
                            </div>
                        </li>
                        <li className="disks-item">
                            <div className="disks-item-header">
                                Локальный диск C:
                            </div>
                            <div className="disks-item-body">
                                <input type="range" min="0" max="100" value="75" id="disk-c" />
                            </div>
                            <div className="disks-item-footer">
                                25 ГБ свободно из 100 ГБ
                            </div>
                        </li>
                        <li className="disks-item">
                            <div className="disks-item-header">
                                Локальный диск C:
                            </div>
                            <div className="disks-item-body">
                                <input type="range" min="0" max="100" value="75" id="disk-c" />
                            </div>
                            <div className="disks-item-footer">
                                25 ГБ свободно из 100 ГБ
                            </div>
                        </li>
                        <li className="disks-item">
                            <div className="disks-item-header">
                                Локальный диск C:
                            </div>
                            <div className="disks-item-body">
                                <input type="range" min="0" max="100" value="75" id="disk-c" />
                            </div>
                            <div className="disks-item-footer">
                                25 ГБ свободно из 100 ГБ
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}