const express = require('express');
const router = express.Router();
const User = require('../models/User');
const History = require('../models/History');

// Add New User
router.post('/add', async (req, res) => {
    try {
        const user = new User({ name: req.body.name });
        await user.save();
        console.log("✅ User added:", user);
        res.send(user);
    } catch (err) {
        console.error("🔥 Error adding user:", err);
        res.status(500).json({ message: "Server error while adding user" });
    }
});

// Get All Users (for dropdown/leaderboard)
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ totalPoints: -1 });
        console.log("✅ Users fetched:", users.length);
        res.json(users);
    } catch (err) {
        console.error("🔥 Error fetching users:", err);
        res.status(500).json({ message: "Server error while fetching users" });
    }
});

// Claim Points
router.post('/claim/:id', async (req, res) => {
    try {
        const randomPoints = Math.floor(Math.random() * 10) + 1;
        const user = await User.findById(req.params.id);

        if (user) {
            user.totalPoints += randomPoints;
            await user.save();

            const history = new History({ userId: user._id, pointsClaimed: randomPoints });
            await history.save();

            console.log(`✅ ${randomPoints} points claimed by ${user.name}`);
            res.send({ user, pointsClaimed: randomPoints });
        } else {
            console.warn("⚠️ User not found for ID:", req.params.id);
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error("🔥 Error claiming points:", err);
        res.status(500).json({ message: "Server error while claiming points" });
    }
});

// Get History
router.get('/history', async (req, res) => {
    try {
        const history = await History.find().populate('userId', 'name').sort({ claimedAt: -1 });
        console.log("✅ Claim history fetched:", history.length);
        res.send(history);
    } catch (err) {
        console.error("🔥 Error fetching history:", err);
        res.status(500).json({ message: "Server error while fetching history" });
    }
});

module.exports = router;
