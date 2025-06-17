const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    name: String,
    designation: String,
    date: String,
    reason: String,
    status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Leave", leaveSchema);
