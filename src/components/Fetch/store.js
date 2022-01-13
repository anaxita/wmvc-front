import {handleGlobalRedirect} from '../../store';

const apiURL = process.env.REACT_APP_API_URL

const handleRefreshToken = async (method, uri, body = '') => {
    const result = {
        data: [],
        err: 'Рефреш токен не действителен',
    };

    try {
        const opt = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('cacheToken')}`,
                'Contnet-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token: localStorage.getItem('cacheRefreshToken'),
            }),
        };

        const f = await fetch(`${apiURL}/refresh`, opt);

        const resp = await f.json();

        if (resp.status === 'ok') {
            localStorage.setItem('cacheToken', resp.message.access_token);
            localStorage.setItem('cacheRefreshToken', resp.message.refresh_token);
            return await handleFetch(method, uri, body);
        }
        localStorage.removeItem('cacheToken');
        localStorage.removeItem('cacheRefreshToken');
        handleGlobalRedirect(true);
        return result;
    } catch (e) {
        localStorage.removeItem('cacheToken');
        localStorage.removeItem('cacheRefreshToken');
        handleGlobalRedirect(true);
        return result;
    }
};

export const handleFetch = (method, uri, body = '') => {
    console.log("API_URL", apiURL)
    const rezultPromise = new Promise(async (resolve) => {
        const result = {
            data: [],
            err: '',
        };

        const opt = {
            method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('cacheToken')}`,
                'Contnet-Type': 'application/json',
            },
        };

        if (body !== '') {
            opt.body = JSON.stringify(body);
        }

        await fetch(`${apiURL}${uri}`, opt)
            .then((response) => (response.status === 401 ? handleRefreshToken(method, uri, body) : response.json()))
            // .then((response) => response.json())
            .then((r) => {
                switch (r.status) {
                    case 'ok':
                        result.data = r.message;
                        result.err = '';
                        break;
                    case 'err':
                        result.data = [];
                        result.err = r.message.err;
                        break;
                    default:
                        result.data = [];
                        result.err = `Неизвестный ответ сервера ${r.message}`;
                        break;
                }
            })
            .catch((e) => {
                result.data = [];
                if (e.message === 'The user aborted a request.') {
                    result.err = 'Ошибка : Сервер не отвечает';
                } else if (e.message.includes('Unexpected token')) {
                    result.err = 'Ошибка : Сервер не найден';
                } else {
                    result.err = `Ошибка : ${e.message}`;
                }
            });

        resolve(result);
    });

    return rezultPromise;
};
