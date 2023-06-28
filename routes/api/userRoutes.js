const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    try {
        await User.create(req.body);
        res.status(200).json({ message: "User created" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
