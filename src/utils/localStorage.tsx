export const setLocalStorage = (key: string, value: any) => {
    if (value === undefined || value === null) {
        localStorage.removeItem(key);
        return;
    }
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
    try {
        const item = localStorage.getItem(key);
        if (item === null || item === "undefined") {
            return null;
        }
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        return null;
    }
};

export const clearLocalStorage = () => {
    localStorage.clear();
};
