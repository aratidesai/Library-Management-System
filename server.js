const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();


// Middleware

app.use(cors());

app.use(express.json());

// Database Connection

mongoose
.connect(process.env.URI)
.then(()=>{

    console.log("DB Connected");

})
.catch((error)=>{

    console.log(error);

});


// Routes

const authRoutes = require("./routes/authRoutes");

const bookRoutes = require("./routes/bookRoutes");

const borrowRoutes = require("./routes/borrowRoutes");

// API Routes

app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);

app.use("/api", borrowRoutes);





// Home Route

app.get("/",(req,res)=>{

    res.send("Library Management System API Running");

});

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});