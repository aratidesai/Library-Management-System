const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// =======================
// Register User
// POST /api/auth/register
// =======================

exports.register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;


        // Check user exists

        const userExists = await User.findOne({
            email
        });


        if (userExists) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }



        // Password encrypt

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );



        // Create User

        const user = await User.create({

            name,
            email,
            password: hashedPassword,
            role

        });



        res.status(201).json({

            message: "User Registered Successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};





// =======================
// Login User
// POST /api/auth/login
// =======================


exports.login = async (req, res) => {


    try {


        const {
            email,
            password
        } = req.body;



        const user = await User.findOne({
            email
        });



        if (!user) {

            return res.status(400).json({

                message: "Invalid Email or Password"

            });

        }




        const isMatch = await bcrypt.compare(
            password,
            user.password
        );



        if (!isMatch) {


            return res.status(400).json({

                message: "Invalid Email or Password"

            });


        }





        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"1d"
            }

        );





        res.status(200).json({

            message:"Login Successful",

            token

        });





    } catch(error) {


        res.status(500).json({

            message:error.message

        });


    }

};