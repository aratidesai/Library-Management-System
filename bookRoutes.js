const express = require("express");

const router = express.Router();


// Import Controller Functions
const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks,
    availableBooks,
    unavailableBooks

} = require("../controllers/bookController");


// Middleware
const authMiddleware = require("../middleware/authMiddleware");


// If you have admin middleware from Part 1
const adminMiddleware = require("../middleware/adminMiddleware");



// =================================
// Add Book
// POST /api/books
// Admin Only
// =================================

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    addBook
);



// =================================
// Get All Books
// GET /api/books
// =================================

router.get(
    "/",
    getBooks
);



// =================================
// Get Single Book
// GET /api/books/:id
// =================================

router.get(
    "/:id",
    getBookById
);

// Update Book
// PUT /api/books/:id
// Admin Only
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateBook
);


// Delete Book
// DELETE /api/books/:id
// Admin Only


router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteBook
);

// Search Books
// GET /api/books/search

router.get(
    "/search",
    searchBooks
);

// Available Books
// GET /api/books/available
router.get(
    "/available",
    availableBooks
);



// Unavailable Books
// GET /api/books/unavailable

router.get(
    "/unavailable",
    unavailableBooks
);



module.exports = router;