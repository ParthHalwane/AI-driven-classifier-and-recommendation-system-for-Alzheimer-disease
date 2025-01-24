const express = require("express");
const awsService = require("../services/awsService");

const router = express.Router();

router.post("/", async (req, res) => {
    const { userId, value1, value2, value3, value4 } = req.body;

    if (!userId || [value1, value2, value3, value4].some((v) => typeof v !== "number")) {
        return res.status(400).json({ message: "Invalid input." });
    }

    try {
        await awsService.saveToDynamoDB(userId, { value1, value2, value3, value4 });
        res.status(200).json({ message: "Data saved successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error saving data.", error: err.message });
    }
});

module.exports = router;
