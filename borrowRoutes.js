const express = require("express");
const router = express.Router();

const {
  borrowBook,
  returnBook,
  borrowHistory,
} = require("../controllers/borrowController");

// Import Authentication Middleware
const authMiddleware = require("../middleware/authMiddleware");

// ==========================
// Borrow Book
// POST /api/books/:id/borrow
// ==========================
router.post("/books/:id/borrow", authMiddleware, borrowBook);

// ==========================
// Return Book
// POST /api/books/:id/return
// ==========================
router.post("/books/:id/return", authMiddleware, returnBook);

// ==========================
// Borrow History
// GET /api/user/history
// ==========================
router.get("/user/history", authMiddleware, borrowHistory);

module.exports = router;