const Book = require("../models/Book");


// =================================
// Add Book
// POST /api/books
// Admin Only
// =================================
exports.addBook = async (req, res) => {
    try {

        const {
            title,
            author,
            category,
            isbn,
            totalCopies
        } = req.body;


        const book = await Book.create({
            title,
            author,
            category,
            isbn,
            totalCopies,
            availableCopies: totalCopies
        });


        res.status(201).json({
            success: true,
            message: "Book added successfully",
            book
        });


    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};



// =================================
// Get All Books
// GET /api/books
// =================================
exports.getBooks = async (req,res)=>{

    try{

        const books = await Book.find();


        res.status(200).json({
            success:true,
            count:books.length,
            books
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};




// =================================
// Get Single Book
// GET /api/books/:id
// =================================
exports.getBookById = async(req,res)=>{

    try{

        const book = await Book.findById(req.params.id);


        if(!book){

            return res.status(404).json({
                message:"Book not found"
            });

        }


        res.status(200).json({
            success:true,
            book
        });



    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};




// =================================
// Update Book
// PUT /api/books/:id
// Admin Only
// =================================
exports.updateBook = async(req,res)=>{

    try{


        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );


        if(!book){

            return res.status(404).json({
                message:"Book not found"
            });

        }



        res.status(200).json({

            success:true,
            message:"Book updated successfully",
            book

        });



    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};




// =================================
// Delete Book
// DELETE /api/books/:id
// Admin Only
// =================================
exports.deleteBook = async(req,res)=>{

    try{


        const book = await Book.findByIdAndDelete(
            req.params.id
        );


        if(!book){

            return res.status(404).json({
                message:"Book not found"
            });

        }



        res.status(200).json({

            success:true,
            message:"Book deleted successfully"

        });



    }catch(error){


        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};




// =================================
// Search Books
// GET /api/books/search
// =================================
exports.searchBooks = async(req,res)=>{

    try{


        let filter={};


        if(req.query.title){

            filter.title={
                $regex:req.query.title,
                $options:"i"
            };

        }



        if(req.query.author){

            filter.author={
                $regex:req.query.author,
                $options:"i"
            };

        }



        if(req.query.category){

            filter.category={
                $regex:req.query.category,
                $options:"i"
            };

        }



        const books = await Book.find(filter);



        res.status(200).json({

            success:true,
            count:books.length,
            books

        });



    }catch(error){


        res.status(500).json({

            success:false,
            message:error.message

        });


    }

};





// =================================
// Available Books
// GET /api/books/available
// =================================
exports.availableBooks = async(req,res)=>{

    try{


        const books = await Book.find({

            availableCopies:{
                $gt:0
            }

        });



        res.status(200).json({

            success:true,
            count:books.length,
            books

        });



    }catch(error){


        res.status(500).json({

            success:false,
            message:error.message

        });


    }

};





// =================================
// Unavailable Books
// GET /api/books/unavailable
// =================================
exports.unavailableBooks = async(req,res)=>{

    try{


        const books = await Book.find({

            availableCopies:0

        });



        res.status(200).json({

            success:true,
            count:books.length,
            books

        });



    }catch(error){


        res.status(500).json({

            success:false,
            message:error.message

        });


    }

};