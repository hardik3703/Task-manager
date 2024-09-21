import mongoose, { Schema, Document } from "mongoose";

export enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
}

export enum Status {
    ToDo = "ToDo",
    InProgress = "InProgress",
    Done = "Done",
}

export interface INote extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    dueDate: Date;
    user: mongoose.Types.ObjectId;
}


 const NoteSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: [String],
        enum: Object.values(Status),
        required: [true, "Status is required"],
    },
    priority: {
        type: [String],
        enum: Object.values(Priority),
        required: [true, "Priority is required"],
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
        validate: {
            validator: (date: Date) => date >= new Date(),
            message: "Due date must be in the future",
        },
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: [true, "user is required"]
    }
});


export default mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
