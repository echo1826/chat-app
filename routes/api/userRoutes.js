const router = require("express").Router();
const { User } = require("../../models");
const { signToken } = require("../../utils/auth");

router.post("/signup", async (req, res) => {
    try {
        const user = await User.create(req.body);
        if (!user) {
            res.status(400).json("Incorrect information provided");
        }
        const token = signToken(user);
        res.status(200).json(token);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            throw new Error("incorrect credentials")
        }
        const authenticated = await user.isCorrectPassword(req.body.password);
        if (!authenticated) {
            throw new Error("incorrect credentials")
        }
        const token = signToken(user);
        // console.log(token);
        res.status(200).json(token);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
