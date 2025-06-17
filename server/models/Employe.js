const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    position: String,
    department: String,
    dateOfJoining: String,
    status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Absent",     // lazy ... 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Employee", employeeSchema);
