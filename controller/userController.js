const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        // Crear un usuario
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error('User Already Exists');
    }
});


const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error('invalid credentials');
    }
});


const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        });
    } catch (error) {
        throw new Error(error);
    }

});


const updatedaUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    try {
        const updatedaUser = await User.findByIdAndUpdate(id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        }, {
            new: true,
        }
        );
        res.json(updatedaUser);
    } catch (error) {
        throw new Error(error);
    }
});



// AZIRvezas

// azirvezas963852



const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        });
    } catch (error) {
        throw new Error(error);
    }

});


const blockUser = asyncHandler(async (req, res) => {

});


const unblockUser = asyncHandler(async (req, res) => {

});




module.exports = { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedaUser, blockUser, unblockUser, };