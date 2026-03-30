/* eslint-disable */
import storage from './storage';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const initialProfile = {
    name: "John Doe",
    subtitle: "Developer / Designer / Creative Thinker",
    aboutTitle: "About Me.",
    aboutDescription: "I am a passionate creative developer building modern web and mobile applications with a focus on premium, interactive experiences.",
    yearsOfExperience: 5,
    projectsCompleted: 24,
    happyClients: "18+",
    email: "hello@johndoe.com",
    githubLink: "https://github.com",
    linkedinLink: "https://linkedin.com",
    instagramLink: "",
    profileImage: ""
};

const mockAxios = {
    get: async (url) => {
        await delay(200);
        const path = url.replace(/https?:\/\/localhost:\d+/g, '');

        if (path === '/api/auth/me') return { data: { email: 'abdullabestoon100@gmail.com', _id: '1' } };
        if (path === '/api/profile') return { data: storage.getData(storage.KEYS.PROFILE, initialProfile) };
        if (path === '/api/projects') return { data: storage.getData(storage.KEYS.PROJECTS, []) };
        if (path === '/api/skills') return { data: storage.getData(storage.KEYS.SKILLS, []) };
        if (path === '/api/education') return { data: storage.getData(storage.KEYS.EDUCATION, []) };
        if (path === '/api/messages') return { data: storage.getData(storage.KEYS.MESSAGES, []) };

        throw new Error('404 Not Found mock url: ' + path);
    },

    post: async (url, data) => {
        await delay(200);
        const path = url.replace(/https?:\/\/localhost:\d+/g, '');

        if (path === '/api/auth/login') {
            if (data.email === 'abdullabestoon100@gmail.com' && data.password === 'Abdulla2004h') {
                return { data: { token: 'mock-jwt-token', email: data.email, _id: '1' } };
            }
            const error = new Error('Unauthorized');
            error.response = { status: 401 };
            throw error;
        }

        if (path === '/api/projects') {
            const saved = storage.addData(storage.KEYS.PROJECTS, data);
            if (!saved) throw new Error('Failed to save project');
            return { data: saved };
        }
        if (path === '/api/skills') {
            const saved = storage.addData(storage.KEYS.SKILLS, data);
            if (!saved) throw new Error('Failed to save skill');
            return { data: saved };
        }
        if (path === '/api/education') {
            const saved = storage.addData(storage.KEYS.EDUCATION, data);
            if (!saved) throw new Error('Failed to save education');
            return { data: saved };
        }
        if (path === '/api/messages') {
            const saved = storage.addData(storage.KEYS.MESSAGES, data);
            if (!saved) throw new Error('Failed to save message');
            return { data: saved };
        }

        throw new Error('404 Not Found mock url: ' + path);
    },

    put: async (url, data) => {
        await delay(200);
        const path = url.replace(/https?:\/\/localhost:\d+/g, '');

        if (path === '/api/profile') {
            if (!storage.saveData(storage.KEYS.PROFILE, data)) {
                throw new Error('Failed to save profile');
            }
            return { data };
        }

        const itemMatch = path.match(/^\/api\/(projects|skills|education|messages)\/([^\/]+)(?:\/read)?$/);
        if (itemMatch) {
            const resource = itemMatch[1].toUpperCase();
            const id = itemMatch[2];
            const isReadAction = path.endsWith('/read');

            if (isReadAction && resource === 'MESSAGES') {
                if (!storage.updateData(storage.KEYS.MESSAGES, { _id: id, read: true })) {
                    throw new Error('Failed to update message');
                }
            } else {
                if (!storage.updateData(storage.KEYS[resource], { ...data, _id: id })) {
                    throw new Error(`Failed to update ${resource.toLowerCase()}`);
                }
            }
            return { data };
        }

        throw new Error('404 Not Found mock url: ' + path);
    },

    delete: async (url) => {
        await delay(200);
        const path = url.replace(/https?:\/\/localhost:\d+/g, '');

        const itemMatch = path.match(/^\/api\/(projects|skills|education|messages)\/([^\/]+)$/);
        if (itemMatch) {
            const resource = itemMatch[1].toUpperCase();
            const id = itemMatch[2];
            if (!storage.deleteData(storage.KEYS[resource], id)) {
                throw new Error(`Failed to delete ${resource.toLowerCase()}`);
            }
            return { data: { success: true } };
        }

        throw new Error('404 Not Found mock url: ' + path);
    },

    defaults: {
        headers: { common: {} }
    }
};

export default mockAxios;
