import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDB() {
    if (db) return db;

    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not set');
    }

    try {
        if (!client) {
            client = new MongoClient(process.env.MONGODB_URI);
            await client.connect();
            console.log('Connected to MongoDB');
        }
        db = client.db(process.env.MONGODB_DB_NAME || 'portfolio');
        console.log('Using DB:', db.databaseName);
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}
