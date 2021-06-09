import React from 'react';

import { Error } from '../../Error/Errors';
import { SpinnerServer } from '../../Spinner/SpinnerServer';

export const DetailsView = ({params, services, isLoading, error}) => {

    const servicesList = services.map((el) => {
        return (
            <div className="row text-info">
            <div className="col bg-dark text-info border-bottom border-secondary">
                {el.display_name}
                </div>
            <div className="col-2 bg-dark text-info border-bottom border-secondary">
            {el.status}
                </div>
            <div className="col bg-dark text-info border-bottom border-secondary">
                {el.user}
                </div>
            <div className="col-2 bg-dark text-info border-bottom border-secondary">
                <i className="bi bi-power m-1"></i>
                <i className="bi bi-bar-chart m-1"></i>
                <i className="bi bi-display m-1 "></i>
            </div>
        </div>
        )
    })
    return (
        <div className="col d-flex flex-column h-sm-100">
            <main className="row overflow-auto text-light bg-secondary">
                <div className="col">
                    <div className="row main-rows p-0 m-0 mt-2 mb-2 bg-dark border-0 rounded align-items-center">
                        <div className="col-1 p-1">
                            <button type="button" className="btn btn-outline-light  border-0"> <i
                                className="bi bi-arrow-left-circle"></i></button>
                        </div>
                        <div className="col p-2">
                            <button type="button" className="btn btn-sm btn-info mr-1"> <i
                                className="bi bi-power m-1"></i>Power</button>
                            <button type="button" className="btn btn-sm btn-info mr-1"> <i
                                className="bi bi-bar-chart m-1"></i>Network</button>
                            <button type="button" className="btn btn-sm btn-info mr-1"><i
                                className="bi bi-display m-1 "></i>Connect</button>
                        </div>
                        <div className="col text-center text-info text-warning">
                            {params.name}
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row main-rows vh-100 p-0 m-0 border-0 rounded bg-dark ">
                        <div className="col-4">
                            <div className="row">
                                <div className="col text-center">
                                    <p className="text-muted">Main data</p>
                                </div>
                            </div>
                            <div className="row">

                         
                                <div className="col pr-0">
                                {
                                   error.params ? <Error err={error.params}/> : (
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item bg-dark text-info border-secondary"><div className="row">
                                            <div className="col">
                                                HV
                                                </div>
                                            <div className="col">
                                                {isLoading.params ? <SpinnerServer /> : params.hv}
                                            </div>
                                        </div>  </li>

                                        <li className="list-group-item bg-dark text-info border-secondary"><div className="row">
                                            <div className="col">
                                                CPU CORES
                                                </div>
                                            <div className="col">
                                                {isLoading.params ? <SpinnerServer /> : params.cpu_cores}
                                            </div>
                                        </div>  </li>

                                        <li className="list-group-item bg-dark text-info border-secondary"><div className="row">
                                            <div className="col">
                                                WEIGHT
                                                </div>
                                            <div className="col">
                                                {isLoading.params ? <SpinnerServer /> : params.weight}
                                            </div>
                                        </div>  </li>
                                        <li className="list-group-item bg-dark text-info border-secondary"><div className="row">
                                            <div className="col">
                                                RAM
                                                </div>
                                            <div className="col">
                                                {isLoading.params ? <SpinnerServer /> : (`${params.memory} GB`)}
                                            </div>
                                        </div>  </li>
                                        <li className="list-group-item bg-dark text-info border-secondary"><div className="row">
                                            <div className="col">
                                                LAN
                                                </div>
                                            <div className="col">
                                                {isLoading.params ? <SpinnerServer /> : params.network}
                                            </div>
                                        </div>  </li>
                                        <li className="list-group-item bg-dark text-info border-secondary"><div className="row">
                                            <div className="col">
                                                LAST BACKUP
                                                </div>
                                            <div className="col">
                                                {isLoading.params ? <SpinnerServer /> : params.backup}
                                            </div>
                                        </div>  </li>

                                        <li className="list-group-item bg-dark text-info border-secondary"><div className="row">
                                            <div className="col">
                                                INFO
                                                </div>
                                            <div className="col">
                                                {isLoading.params ? <SpinnerServer /> : params.description}
                                            </div>
                                        </div>  </li>
                                    </ul>
                                    )
                                }
                                </div>
                            </div>
                        </div>
                        <div className="col-8 border-left border-secondary">
                            <div className="row">
                                <div className="col text-center">
                                    <p className="text-muted">Disks data</p>
                                </div>
                            </div>
                            <div className="row overflow-auto h-25">
                                <div className="col-12">
                                    <div className="row my-p-16 m-0 border-bottom border-secondary">
                                        <div className="col-lg-2 col-xl-1 text-info">Disk C:</div>
                                        <div className="col-lg-3 col-xl-2">
                                            <div className="progress bg-secondary h-100">
                                                <div className="progress-bar bg-danger" role="progressbar"
                                                    aria-valuenow="90" aria-valuemin="0"
                                                    aria-valuemax="100">90%</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-2 text-info">
                                            90 GB / 100 GB
                                            </div>
                                    </div>
                                    <div className="row my-p-16 m-0 border-bottom border-secondary">
                                        <div className="col-lg-2 col-xl-1 text-info">Disk D:</div>
                                        <div className="col-lg-3 col-xl-2">
                                            <div className="progress bg-secondary h-100 ">
                                                <div className="progress-bar bg-primary " role="progressbar"
                                                    aria-valuenow="90" aria-valuemin="0"
                                                    aria-valuemax="100">15%</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-2 text-info">
                                            10 GB / 100 GB
                                            </div>
                                    </div>
                                    <div className="row my-p-16 m-0 border-bottom border-secondary">
                                        <div className="col-lg-2 col-xl-1 text-info">Disk B:</div>
                                        <div className="col-lg-3 col-xl-2">
                                            <div className="progress bg-secondary h-100">
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    aria-valuenow="90" aria-valuemin="0"
                                                    aria-valuemax="100">50%</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-2 text-info">
                                            500 GB / 100 GB
                                            </div>
                                    </div>
                                    <div className="row my-p-16 m-0 border-bottom border-secondary">
                                        <div className="col-lg-2 col-xl-1 text-info">Disk C:</div>
                                        <div className="col-lg-3 col-xl-2">
                                            <div className="progress bg-secondary h-100">
                                                <div className="progress-bar bg-danger" role="progressbar"
                                                    aria-valuenow="90" aria-valuemin="0"
                                                    aria-valuemax="100">90%</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-2 text-info">
                                            90 GB / 100 GB
                                            </div>
                                    </div>
                                    <div className="row my-p-16 m-0 border-bottom border-secondary">
                                        <div className="col-lg-2 col-xl-1 text-info">Disk D:</div>
                                        <div className="col-lg-3 col-xl-2">
                                            <div className="progress bg-secondary h-100 ">
                                                <div className="progress-bar bg-primary " role="progressbar"
                                                    aria-valuenow="90" aria-valuemin="0"
                                                    aria-valuemax="100">15%</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-2 text-info">
                                            10 GB / 100 GB
                                            </div>
                                    </div>
                                    <div className="row my-p-16 m-0 border-bottom border-secondary">
                                        <div className="col-lg-2 col-xl-1 text-info">Disk B:</div>
                                        <div className="col-lg-3 col-xl-2">
                                            <div className="progress bg-secondary h-100">
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    aria-valuenow="90" aria-valuemin="0"
                                                    aria-valuemax="100">50%</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-2 text-info">
                                            500 GB / 100 GB
                                            </div>
                                    </div>
                                    <div className="row my-p-16 m-0 border-bottom border-secondary">
                                        <div className="col-lg-2 col-xl-1 text-info">Disk C:</div>
                                        <div className="col-lg-3 col-xl-2">
                                            <div className="progress bg-secondary h-100">
                                                <div className="progress-bar bg-danger" role="progressbar"
                                                    aria-valuenow="90" aria-valuemin="0"
                                                    aria-valuemax="100">90%</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-2 text-info">
                                            90 GB / 100 GB
                                            </div>
                                    </div>
                                    <div className="row my-p-16 m-0 border-bottom border-secondary">
                                        <div className="col-lg-2 col-xl-1 text-info">Disk D:</div>
                                        <div className="col-lg-3 col-xl-2">
                                            <div className="progress bg-secondary h-100 ">
                                                <div className="progress-bar bg-primary " role="progressbar"
                                                    aria-valuenow="90" aria-valuemin="0"
                                                    aria-valuemax="100">15%</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-2 text-info">
                                            10 GB / 100 GB
                                            </div>
                                    </div>
                                    <div className="row my-p-16 m-0 border-bottom border-secondary">
                                        <div className="col-lg-2 col-xl-1 text-info">Disk B:</div>
                                        <div className="col-lg-3 col-xl-2">
                                            <div className="progress bg-secondary h-100">
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    aria-valuenow="90" aria-valuemin="0"
                                                    aria-valuemax="100">50%</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-2 text-info">
                                            500 GB / 100 GB
                                            </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4 ">
                                <hr />
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col text-center">
                                            <p className="text-muted">Services</p>
                                        </div>
                                    </div>
                                    <div className="overflow-auto h-25">

                                    <div className="row text-info text-uppercase font-weight-bold border-bottom border-secondary">
                                        <div className="col">
                                            Service
                                            </div>
                                        <div className="col-2">
                                            Status
                                            </div>
                                        <div className="col">
                                            Account
                                            </div>
                                        <div className="col-2">
                                            Action
                                            </div>
                                    </div>
                                        {error.params ? <Error err={error.params}/> : (isLoading.services ? <SpinnerServer/> : servicesList)}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col text-center">
                                            <p className="text-muted">Users</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}