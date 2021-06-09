import React from 'react';
import { useEffect, useState } from 'react';
import { DetailsView } from './DetailsView';
import { handleGetServerParams, handleGetServerServices, useServerDetails } from './store';

export const Details = (props) => {
    const { params, disks, services, processes, isLoading, error } = useServerDetails()

    useEffect(() => {
        handleGetServerParams({ serverHV: props.match.params.hv, serverName: props.match.params.name })
        handleGetServerServices({ serverHV: props.match.params.hv, serverName: props.match.params.name })
    }, [props.match.params.hv, props.match.params.name])

    return (
        <DetailsView params={params} services={services} isLoading={isLoading} error={error} />
    )
}