export const MAIN_URL = 'https://dc.kmsys.ru:53338';
export let TOKEN_ACCESS = localStorage.getItem('cacheToken');
export let REFRESH_TOKEN = localStorage.getItem('cacheRefreshToken');
export let USER_INFO = localStorage.getItem('cacheUserInfo');

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('cacheUserInfo'))
}

export const getSearch = (itemsList, value) => {
    let keys = Object.keys(itemsList[0]); // ['id', 'name', ...]
    let newItemsList = itemsList.filter((item) => {
        let isOk = false
        keys.forEach((key) => {
            if (typeof item[key] === 'string') {
                let isInclude = item[key].toLowerCase().includes(value.toLowerCase())
                if(isInclude) {
                    isOk = true;
                    return false;
                }
            }
        })
        if (isOk) {
            return item
        }
    })
    console.log(newItemsList);
    return newItemsList
}