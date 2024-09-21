import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log("Database is already connected");
        return;
    }
    
    try {
        const db = await mongoose.connect(
            "mongodb+srv://root:root@springcluster.xqyozto.mongodb.net/?retryWrites=true&w=majority&appName=springCluster",
            {}
        );
        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default dbConnect;
