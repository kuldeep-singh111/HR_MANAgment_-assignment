const Employee = require("../models/Employe");

const addEmployee = async (req, res) => {
    try {
        const { candidateId } = req.body;
        const candidate = await require("../models/Candidate").findById(candidateId);
        if (!candidate) return res.status(404).json({ message: "Candidate not found" });



        const newEmp = new Employee({
            fullName: candidate.fullName,
            email: candidate.email,
            phone: candidate.phone,
            position: candidate.position,
            department: "IT",
            dateOfJoining: new Date().toLocaleDateString(),
            // user: req.user._id,
            user: req.body.userId

        });
        await newEmp.save();
        res.status(201).json(newEmp);
    } catch (err) {
        res.status(500).json({ message: "Error adding employee", error: err.message });
    }
};

const getEmployees = async (req, res) => {
    const { userId } = req.params;

    try {
        const emps = await Employee.find({ user: userId });
        res.status(200).json(emps);
    } catch (err) {
        res.status(500).json({ message: "Error fetching employees" });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee" });
    }
};


const editEmployee = async (req, res) => {
    try {
        const updated = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: "Employee not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
};

module.exports = { addEmployee, getEmployees, deleteEmployee, editEmployee };
