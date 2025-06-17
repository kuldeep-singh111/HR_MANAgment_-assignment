const Employee = require("../models/Employe");
const Attendance = require("../models/Attendance");


const getAllEmployees = async (req, res) => {
    try {
        const userId = req.user.id;
        const employees = await Employee.find({ user: userId });
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: "Error fetching employees" });
    }
};


const markAttendance = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existing = await Attendance.findOne({
            employee: id,
            user: userId,
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
        });

        if (existing) {
            existing.status = status;
            await existing.save();
            return res.json(existing);
        }

        const newRecord = new Attendance({
            employee: id,
            status,
            user: userId,
            date: new Date(),
        });

        await newRecord.save();
        res.json(newRecord);
    } catch (err) {
        res.status(500).json({ message: "Failed to update attendance", error: err.message });
    }
};

const TodayAttendace = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const records = await Attendance.find({
            user: userId,
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
        });

        res.json(records);
    } catch (err) {
        res.status(500).json({ message: "Error getting today's attendance", error: err.message });
    }
};

module.exports = {
    getAllEmployees,
    markAttendance,
    TodayAttendace
};