import mongoose from 'mongoose';

const DEFAULT_MONGO_URI = 'mongodb://127.0.0.1:27017/portfolio_cms';

const globalCache = globalThis;

if (!globalCache.__mongooseConnection) {
    globalCache.__mongooseConnection = {
        conn: null,
        promise: null,
    };
}

export const getMongoUri = () => process.env.MONGO_URI || DEFAULT_MONGO_URI;

export const connectToDatabase = async () => {
    const cached = globalCache.__mongooseConnection;

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(getMongoUri()).then((connection) => {
            console.log('MongoDB connected successfully');
            return connection;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
};
