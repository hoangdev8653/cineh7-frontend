export const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
    const value = JSON.parse(localStorage.getItem(key) || '{}');
    return value;
};

export const clearLocalStorage = () => {
    return localStorage.clear();
};
