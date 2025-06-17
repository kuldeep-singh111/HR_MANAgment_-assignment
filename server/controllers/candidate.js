const Candidate = require('../models/Candidate');

const addCandidate = async (req, res) => {
    console.log("route hit....")
    try {
        const { fullName, email, phone, position, experience, resumeUrl } = req.body;

        if (!fullName || !email || !phone || !position || !experience || !resumeUrl) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const userId = req.user?.id;

        console.log("id", userId)


        const newCandidate = new Candidate({
            fullName,
            email,
            phone,
            position,
            experience,
            resumeUrl,
            userId
        });

        console.log("📦 New candidate data:", {
            fullName,
            email,
            phone,
            position,
            experience,
            resumeUrl,
            userId: req.user.id
        });

        await newCandidate.save();

        res.status(201).json({ message: "Candidate added successfully." });
    } catch (error) {
        console.error("Error adding candidate:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};



const getCandidates = async (req, res) => {
    try {
        const userId = req.user?.id;
        const candidates = await Candidate.find({ userId });
        res.status(200).json(candidates);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch candidates", error: err.message });
    }
};



const deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        await Candidate.findByIdAndDelete(id);
        res.status(200).json({ message: "Candidate deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete candidate", error: err.message });
    }
};

module.exports = {
    addCandidate,
    getCandidates,
    deleteCandidate
};
