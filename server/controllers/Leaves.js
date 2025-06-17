const Leave = require("../models/Leaves");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employe");


const Leaves = async (req, res) => {
    try {
        const { employeeId, date, reason } = req.body;
        const user = req.user.id;


        const attendance = await Attendance.findOne({
            employee: employeeId,
            user,
            status: "Present"
        });

        if (!attendance) {
            return res.status(400).json({ message: "Only employees marked 'Present' can apply for leave." });
        }

        const emp = await Employee.findOne({ _id: employeeId, user });
        if (!emp) return res.status(404).json({ message: "Employee not found." });

        const newLeave = new Leave({
            user,
            employeeId,
            name: emp.fullName,
            designation: emp.position,
            date,
            reason,
        });

        await newLeave.save();
        res.status(201).json(newLeave);
    } catch (err) {
        res.status(500).json({ message: "Failed to add leave", error: err.message });
    }
};


const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ user: req.user.id });
        res.json(leaves);
    } catch {
        res.status(500).json({ message: "Failed to fetch leaves" });
    }
};


const LeavesStatus = async (req, res) => {
    try {
        const updated = await Leave.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updated);
    } catch {
        res.status(500).json({ message: "Failed to update status" });
    }
};


const getPresentEmployees = async (req, res) => {
    try {
        const user = req.user.id;
        const start = new Date(); start.setHours(0, 0, 0, 0);
        const end = new Date(); end.setHours(23, 59, 59, 999);

        const attendances = await Attendance.find({
            user,
            date: { $gte: start, $lte: end },
            status: "Present",
        }).populate("employee");

        res.json(attendances.map(a => a.employee).filter(emp => emp && emp._id));   // error pe error aarha tha yha sey if id null ..  then done 
    } catch {
        res.status(500).json({ message: "Failed to fetch present employees" });
    }
};

module.exports = { Leaves, getLeaves, LeavesStatus, getPresentEmployees };
