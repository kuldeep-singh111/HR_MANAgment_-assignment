const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: "2h" });


        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000,
        })

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {

        res.status(500).json({ message: "Internal Server error." });
    }
};


const logOut = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" })
}

module.exports = { login, logOut };