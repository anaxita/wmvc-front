import { handleGlobalRedirect } from '../../store';


const handleRefreshToken = async (method, uri, body = '') => {
    let result = {
        data: [],
        err: 'Рефреш токен не действителен',
    }

    try {
        let opt = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('cacheToken')}`,
                'Contnet-Type': 'application/json'
            },
            body: JSON.stringify({
                "refresh_token": localStorage.getItem('cacheRefreshToken'),
            })
        }

        const f = await fetch(`https://${localStorage.getItem('cacheServerUrl')}/refresh`, opt)

        const resp = await f.json();

        if (resp.status === 'ok') {
            localStorage.setItem('cacheToken', resp.message.access_token)
            localStorage.setItem('cacheRefreshToken', resp.message.refresh_token)
            return await handleFetch(method, uri, body);
        }
        localStorage.removeItem('cacheToken');
        localStorage.removeItem('cacheRefreshToken');
        handleGlobalRedirect(true)
        return result
    } catch (e) {
        localStorage.removeItem('cacheToken');
        localStorage.removeItem('cacheRefreshToken');
        handleGlobalRedirect(true)
        return result
    }

}

export const handleFetch = (method, uri, body = '') => {
    const rezultPromise = new Promise(async (resove) => {
        let result = {
            data: [],
            err: '',
        }

        let opt = {
            method: method,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('cacheToken')}`,
                'Contnet-Type': 'application/json'
            },
        }

        if (body !== '') {
            opt.body = JSON.stringify(body)
        }

        await fetch(`https://${localStorage.getItem('cacheServerUrl')}${uri}`, opt)
            // .then((response) => response.status === 401 ? handleRefreshToken(method, uri, body) : response.json())
            .then((response) => response.json())
            .then((r) => {
                switch (r.status) {
                    case 'ok':
                        result.data = r.message
                        result.err = ''
                        break
                    case 'err':
                        result.data = []
                        result.err = r.message.err
                        break
                    default:
                        result.data = []
                        result.err = `Неизвестный ответ сервера ${r.message}`
                        break
                }
            })
            .catch((e) => {
                result.data = []
                if (e.message === 'The user aborted a request.') {
                    result.err = `Ошибка : Сервер не отвечает`
                } else if (e.message.includes('Unexpected token')) {
                    result.err = `Ошибка : Сервер не найден`
                } else {
                    result.err = `Ошибка : ${e.message}`
                }
            })

        resove(result)
    })

    return rezultPromise
}