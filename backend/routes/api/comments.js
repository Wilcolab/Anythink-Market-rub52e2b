const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

router.post("/", async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ error: "Failed to create comment" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch comment" });
    }
}
);

//add another endpoint to delete a comment by id
router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});