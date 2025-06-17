const express = require("express");
const router = express.Router();
const { register } = require("../controllers/registerCon");
const { login, logOut } = require("../controllers/login");
const auth = require("../middleware/auth")
const { addCandidate, getCandidates,
    deleteCandidate } = require("../controllers/candidate");
const { addEmployee, getEmployees, deleteEmployee, editEmployee } = require("../controllers/employees")
const { getAllEmployees,
    markAttendance, TodayAttendace } = require("../controllers/attendance")

const { Leaves, getLeaves, LeavesStatus, getPresentEmployees } = require("../controllers/Leaves")

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.post("/addcandidates", auth, addCandidate)
router.get("/getcandidates", auth, getCandidates);
router.delete("/deletecandidate/:id", auth, deleteCandidate)
router.post("/addemployee", auth, addEmployee);
router.get("/getemployees/:userId", auth, getEmployees);
router.delete("/deleteemployee/:id", auth, deleteEmployee);
router.put("/editemployee/:id", auth, editEmployee)
router.get("/employees", auth, getAllEmployees);
router.put("/attendance/:id", auth, markAttendance);
router.get("/attendance/today", auth, TodayAttendace)
router.post("/leaves", auth, Leaves);
router.get("/getleaves", auth, getLeaves);
router.put("/leaves/:id/status", auth, LeavesStatus)
router.get("/present-employees", auth, getPresentEmployees);

// authentication

router.get("/auth/check", auth, (req, res) => {
    res.status(200).json({ message: "Authenticated" });
});

module.exports = router;
