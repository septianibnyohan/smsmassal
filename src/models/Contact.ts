import { Schema, model } from 'mongoose';

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        lowercase: true
    }
});

export default model('Contact', ContactSchema);