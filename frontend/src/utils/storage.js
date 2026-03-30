/**
 * Modular Storage Utility for Local CMS
 * Handles data persistence using localStorage
 */

const storage = {
    // Keys for different data entities
    KEYS: {
        PROFILE: 'portfolio_profile',
        SKILLS: 'portfolio_skills',
        PROJECTS: 'portfolio_projects',
        EDUCATION: 'portfolio_education',
        MESSAGES: 'portfolio_messages'
    },

    /**
     * Get data by key
     * @param {string} key 
     * @param {any} defaultValue 
     */
    getData: (key, defaultValue = []) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error(`Error reading from localStorage (${key}):`, error);
            return defaultValue;
        }
    },

    /**
     * Save data (full overwrite)
     * @param {string} key 
     * @param {any} data 
     */
    saveData: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error saving to localStorage (${key}):`, error);
            return false;
        }
    },

    /**
     * Update an item in a list or update an object
     * @param {string} key 
     * @param {any} update 
     * @param {string} idField - Name of the ID field if it's a list
     */
    updateData: (key, update, idField = '_id') => {
        try {
            const current = storage.getData(key);

            // If it's a list, find and replace the item
            if (Array.isArray(current)) {
                const updated = current.map(item =>
                    item[idField] === update[idField] ? { ...item, ...update } : item
                );
                return storage.saveData(key, updated);
            }

            // If it's an object, merge and save
            return storage.saveData(key, { ...current, ...update });
        } catch (error) {
            console.error(`Error updating localStorage (${key}):`, error);
            return false;
        }
    },

    /**
     * Delete an item from a list
     * @param {string} key 
     * @param {string|number} id 
     * @param {string} idField 
     */
    deleteData: (key, id, idField = '_id') => {
        try {
            const current = storage.getData(key);
            if (Array.isArray(current)) {
                const filtered = current.filter(item => item[idField] !== id);
                return storage.saveData(key, filtered);
            }
            return false;
        } catch (error) {
            console.error(`Error deleting from localStorage (${key}):`, error);
            return false;
        }
    },

    /**
     * Add a new item to a list
     * @param {string} key 
     * @param {any} item 
     */
    addData: (key, item) => {
        try {
            const current = storage.getData(key);
            if (Array.isArray(current)) {
                const newItem = {
                    ...item,
                    _id: Math.random().toString(36).substr(2, 9),
                    createdAt: new Date().toISOString()
                };
                return storage.saveData(key, [...current, newItem]);
            }
            return false;
        } catch (error) {
            console.error(`Error adding to localStorage (${key}):`, error);
            return false;
        }
    }
};

export default storage;
