import { useEffect, useState } from 'react';
import { MAIN_URL, TOKEN_ACCESS } from '../../../Constants/Constants';
import { DetailsView } from './DetailsView';

export const Details = (props) => {
    const [vm, setVm] = useState({
        id: '',
        hv: props.match.params.hv,
        name: props.match.params.name,
        cpu: 0,
        weight: 0,
        memory: 0,
        backup: '',
        network: '',
        description: '',

    })

    const [isLoading, setLoading] = useState(false)
    // const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)

        fetch(`${MAIN_URL}/servers/${vm.hv}/${vm.name}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN_ACCESS}`,
                'Contnet-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setLoading(false)
                setVm(response.message)
            })

    }, [vm.hv, vm.name])

    return (
        <DetailsView vm={vm} isLoading={isLoading}/>
    )
}