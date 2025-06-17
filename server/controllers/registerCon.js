const bcrypt = require("bcrypt");
const User = require("../models/User")


const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All filed are required" })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "THis username already in use!...." })
        }


        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "Registered Successfully" });
    } catch (error) {

        return res.status(500).json({ message: "Internal Server error" })
    }

};


module.exports = { register };
