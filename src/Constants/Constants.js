// export const localStorage.getItem('cacheServerUrl') = 'https://dc.kmsys.ru:53338';
export let TOKEN_ACCESS = localStorage.getItem('cacheToken');
export let REFRESH_TOKEN = localStorage.getItem('cacheRefreshToken');
export let USER_INFO = localStorage.getItem('cacheUserInfo');

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('cacheUserInfo'))
}

export const getSearch = (itemsList, value) => {
    let newItemsList = itemsList.filter((item) => {
        let values = Object.values(item); //Возвращает массив со значениеями объекта ['admin', 'фиксики', 0]
        let isOk = false

        values.forEach((v) => {
            if (typeof v === 'string') {
                let isInclude = v.toLowerCase().trim().includes(value.toLowerCase().trim())
                if(isInclude) {
                    isOk = true;
                    return false;
                }
            }
        })

        if (isOk) {
            return item
        }

        return null
    })
    return newItemsList
}