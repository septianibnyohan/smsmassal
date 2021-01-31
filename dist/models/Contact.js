"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ContactSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('Contact', ContactSchema);
