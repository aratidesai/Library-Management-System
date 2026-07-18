const User = require("../models/User");
const Book = require("../models/Book");

// =========================
// Borrow Book
// =========================
exports.borrowBook = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const book = await Book.findById(req.params.id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // Check if copies are available
    if (book.availableCopies <= 0) {
      return res.status(400).json({
        message: "Book is not available",
      });
    }

    // Check if user already borrowed this book
    const alreadyBorrowed = user.borrowedBooks.find(
      (item) =>
        item.book.toString() === req.params.id &&
        item.returned === false
    );

    if (alreadyBorrowed) {
      return res.status(400).json({
        message: "You have already borrowed this book",
      });
    }

    // Set due date (7 days)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    // Save borrow record
    user.borrowedBooks.push({
      book: book._id,
      borrowDate: new Date(),
      dueDate: dueDate,
      returned: false,
    });

    // Reduce available copies
    book.availableCopies -= 1;

    await user.save();
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      dueDate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Return Book
// =========================
exports.returnBook = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // Find borrowed book
    const borrowedBook = user.borrowedBooks.find(
      (item) =>
        item.book.toString() === req.params.id &&
        item.returned === false
    );

    if (!borrowedBook) {
      return res.status(400).json({
        message: "Book was not borrowed",
      });
    }

    // Mark as returned
    borrowedBook.returned = true;

    // Increase available copies
    book.availableCopies += 1;

    await user.save();
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Borrow History
// =========================
exports.borrowHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "borrowedBooks.book"
    );

    res.status(200).json({
      success: true,
      borrowedBooks: user.borrowedBooks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};