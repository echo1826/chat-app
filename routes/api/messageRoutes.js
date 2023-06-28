const router = require("express").Router();
const { Message } = require("../../models");

router.post("/", async (req, res) => {
    try {
        await Message.create(req.body);
        res.status(200).json({ message: "New message added" });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const messages = await Message.find({})
            .select("-__v")
            .populate({ path: "user", select: "-password -__v -_id" });
        res.status(200).json(messages);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
