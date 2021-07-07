import { handleGlobalRedirect } from '../../store';


const handleRefreshToken = async (method, uri, body ='') => {
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

        const f = await fetchWithTimeout(`https://${localStorage.getItem('cacheServerUrl')}/refresh`, opt)
        
        const resp = await f.json();
        
        if(resp.status === 'ok') {
            localStorage.setItem('cacheToken', resp.message.access_token)
            localStorage.setItem('cacheRefreshToken', resp.message.refresh_token)
            return await handleRepeatFetch(method, uri, body);
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

export const handleFetch = async (method, uri, body = '') => {
    let result = {
        data: [],
        err: '',
    }

    try {
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

        const f = await fetchWithTimeout(`https://${localStorage.getItem('cacheServerUrl')}${uri}`, opt)

        // const f = await fetch(`${localStorage.getItem('cacheServerUrl')}${uri}`, opt)
        if(f.status === 401) {
            return await handleRefreshToken(method, uri, body);
        }
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
        if(e.message === 'The user aborted a request.') {
            result.err = `Ошибка : Сервер не отвечает`
        } else if(e.message.includes('Unexpected token')) {
            result.err = `Ошибка : Сервер не найден`
        } else {
            result.err = `Ошибка : ${e.message}`
        }
    }

    return result
}

export const handleRepeatFetch = async (method, uri, body = '') => {
    
    let result = {
        data: [],
        err: '',
    }

    try {
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



        const f = await fetchWithTimeout(`https://${localStorage.getItem('cacheServerUrl')}${uri}`, opt)
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
        if(e.message === 'The user aborted a request.') {
            result.err = `Ошибка : Сервер не отвечает`
        } else {
            result.err = `Ошибка : ${e.message}`
        }
    }
    return result
}

// Прерывание запроса на бекенд
async function fetchWithTimeout(resource, options) {
    const { timeout = 120000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
    return response;
}