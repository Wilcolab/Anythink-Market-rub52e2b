/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 */

const express = require("express");

/**
 * GET /
 * @summary Retrieve all comments.
 * @route GET /api/comments
 * @returns {Array<Object>} 200 - An array of comment objects
 * @returns {Object} 500 - Error message if fetching fails
 */

/**
 * POST /
 * @summary Create a new comment.
 * @route POST /api/comments
 * @param {Object} req.body - The comment data to create
 * @returns {Object} 201 - The created comment object
 * @returns {Object} 400 - Error message if creation fails
 */

/**
 * GET /:id
 * @summary Retrieve a comment by its ID.
 * @route GET /api/comments/{id}
 * @param {string} id.path.required - The ID of the comment to retrieve
 * @returns {Object} 200 - The comment object
 * @returns {Object} 404 - Error message if comment not found
 * @returns {Object} 500 - Error message if fetching fails
 */

/**
 * PUT /:id
 * @summary Update a comment by its ID.
 * @route PUT /api/comments/{id}
 * @param {string} id.path.required - The ID of the comment to update
 * @param {Object} req.body - The updated comment data
 * @returns {Object} 200 - The updated comment object
 * @returns {Object} 404 - Error message if comment not found
 * @returns {Object} 400 - Error message if update fails
 */

/**
 * DELETE /:id
 * @summary Delete a comment by its ID.
 * @route DELETE /api/comments/{id}
 * @param {string} id.path.required - The ID of the comment to delete
 * @returns {Object} 200 - Success message
 * @returns {Object} 404 - Error message if comment not found
 * @returns {Object} 500 - Error message if deletion fails
 */
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
router.put("/:id", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json(comment);
    } catch (err) {
        res.status(400).json({ error: "Failed to update comment" });
    }
});
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