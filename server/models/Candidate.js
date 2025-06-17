const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    status: {
        type: String
        , default: "New"
    },
    resumeUrl: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true
    },
}, { timestamps: true });




const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;