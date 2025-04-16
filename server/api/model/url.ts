import { model, Schema } from "mongoose";

const UrlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    }
})

export const Url = model('URL', UrlSchema)