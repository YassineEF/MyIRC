import express from "express";

const router = express.Router();

router.get("/", (req, res) => console.log(process.stdin));

module.exports = router;
