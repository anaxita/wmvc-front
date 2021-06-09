import { MAIN_URL, TOKEN_ACCESS } from '../../Constants/Constants'

export const handleFetch = async (method, uri, body = '') => {
    let result = {
        data: [],
        err: '',
    }

    try {
        let opt = {
            method: method,
            headers: {
                'Authorization': `Bearer ${TOKEN_ACCESS}`,
                'Contnet-Type': 'application/json'
            },
        }

        if (body !== '') {
            opt.body = JSON.stringify(body)
        }

        const f = await fetch(`${MAIN_URL}${uri}`, opt)
        const resp = await f.json()

        switch (resp.status) {
            case 'ok':
                result.data = resp.message
                result.err = ''
                break
            case 'err':
                result.data = []
                result.err = resp.message.err
                break
            default:
                result.data = []
                result.err = `Неизвестный ответ сервера ${resp.message}`
                break
        }
    } catch (e) {
        result.data = []
        result.err = `Ошибка : ${e.message}`
    }

    return result
}