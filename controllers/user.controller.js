const User = require("../models/User");

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get users"
        });
    }
};


// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // NEW: Admin cannot delete another Admin
        if (user.role === "Admin") {
            return res.status(403).json({
                success: false,
                message: "Admin users cannot be deleted"
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user"
        });
    }
};


module.exports = {
    getUsers,
    deleteUser
};