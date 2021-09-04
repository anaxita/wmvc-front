// export const localStorage.getItem('cacheServerUrl') = 'https://dc.kmsys.ru:53338';
export const TOKEN_ACCESS = localStorage.getItem('cacheToken');
export const REFRESH_TOKEN = localStorage.getItem('cacheRefreshToken');
export const USER_INFO = localStorage.getItem('cacheUserInfo');

export const getUserInfo = () => JSON.parse(localStorage.getItem('cacheUserInfo'));

export const getSearch = (itemsList, value) => itemsList.filter((item) => {
  const values = Object.values(item); // Возвращает массив со значениеями объекта ['admin', 'фиксики', 0]
  let isOk = false;

  values.forEach((v) => {
    if (typeof v === 'string') {
      const isInclude = v.toLowerCase().trim().includes(value.toLowerCase().trim());

      if (isInclude) {
        isOk = true;
      }
    }
  });

  if (isOk) {
    return item;
  }

  return null;
});
