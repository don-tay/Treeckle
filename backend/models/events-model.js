const mongoose = require('mongoose');
const mongoTenant = require('mongo-tenant');
const schema = mongoose.Schema;

const eventSchema = new schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false,
        default: "No description provided."
    },
    categories: {
        type: [String],
        required: false,
        unique: false
    },
    capacity: {
        type: Number,
        required: false,
        unique: false
    },
    organisedBy: {
        type: String,
        required: true,
        unique: false
    },
    createdBy: {
        type: schema.Types.ObjectId,
        required: true,
        unique: false
    },
    posterPath: {
        type: String,
        required: true,
        unique: false
    },
    venue: {
        type: String,
        required: false,
        unique: false
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true,
        unique: false
    },
    eventDate: {
        type: Date,
        required: false,
        unique: false
    },
    signupsAllowed: {
        type: Boolean,
        required: true,
        unique: false
    },
    attendees: {
        type: [schema.Types.ObjectId],
        required: false,
        unique: false
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    }
});

eventSchema.plugin(mongoTenant);
const Event = mongoose.model('event', eventSchema);
module.exports = Event;