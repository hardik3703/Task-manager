import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },

});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);


