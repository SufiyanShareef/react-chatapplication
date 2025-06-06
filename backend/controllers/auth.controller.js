import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password != confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        
        // hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/
        const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilepic : girlProfilepic,// default profile picture
        });

        if (newUser) {
            //Generate JWD token.
            generateTokenAndSetCookie(newUser, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
			res.status(400).json({ error: "Invalid user data" });
		}
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "internal server error" });
    }

};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isValidPassword = await bcrypt.compare(password, user?.password || "");
        if (!user || !isValidPassword) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        
        
        //Generate JWD token
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({ error: "internal server error" });
    }
}

export const logout = async (req, res) => {
    console.log("logoutpage")
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "logged out successfully" });
    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({ error: "internal server error" });
    }
}