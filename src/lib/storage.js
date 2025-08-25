// Simple wrapper around localStorage

const setItemInStorage = (key, value) => {
    try {
        const val = typeof value === "object" ? JSON.stringify(value) : value;
        localStorage.setItem(key, val);
    } catch (error) {
        console.error("Error setting item in localStorage:", error);
    }
};

const getItemFromStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (!item) return null;

        try {
            return JSON.parse(item);
        } catch {
            return item;
        }
    } catch (error) {
        console.error("Error getting item from localStorage:", error);
        return null;
    }
}

const removeItemFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing item from localStorage:", error);
    }
};

export {
    setItemInStorage,
    getItemFromStorage,
    removeItemFromStorage,
};
