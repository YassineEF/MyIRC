import mongoose, { SchemaType } from "mongoose";
const {Schema, model} = mongoose;

const messageSchema = new Schema({
    message:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    sender:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reciver:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    group:{
        type: Schema.Types.ObjectId,
        ref: 'Group',
        default: null,
    },
});

export default mongoose.model('Message', messageSchema);

