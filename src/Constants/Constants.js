export const MAIN_URL = 'https://dc.kmsys.ru:53338';
export let TOKEN_ACCESS = localStorage.getItem('cacheToken');
export let REFRESH_TOKEN = localStorage.getItem('cacheRefreshToken');
export let USER_INFO = localStorage.getItem('cacheUserInfo');

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('cacheUserInfo'))
}