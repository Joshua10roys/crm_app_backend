import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';
import cryptoRandomString from 'crypto-random-string';
import { sendMail } from '../helper/mail.js';
import mongoose from "mongoose";



async function genHashPassword(password) {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

async function sortDetails(userFromDB) {

    const user = {
        _id: userFromDB._id,
        username: userFromDB.username,
        userType: userFromDB.userType,
        firstname: userFromDB.firstname,
        lastname: userFromDB.lastname,
        email: userFromDB.email,
        contactNumber: userFromDB.contactNumber,
        address: userFromDB.address,
        city: userFromDB.city,
        state: userFromDB.state,
        postcode: userFromDB.postcode,
        country: userFromDB.country,
    }
    return user;
}



const addUser = async (req, res) => {

    const { username, firstname, lastname, password, userType } = req.body;

    try {

        const userFromDB = await User.findOne({ username });

        if (userFromDB) {

            res.status(409).send({ status: 409, msg: 'User name already exist' });
        } else {

            const hashedPassword = await genHashPassword(password);

            await User.create({
                username: username,
                firstname: firstname,
                lastname: lastname,
                password: hashedPassword,
                userType: userType
            });
            res.status(201).send({ status: 201, msg: 'New user Created Successfully' });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

const getUserByID = async (req, res) => {

    try {

        const _id = req.params._id;

        if (mongoose.isValidObjectId(_id)) {

            const userFromDB = await User.findById({ _id });

            if (userFromDB) {
                const user = await sortDetails(userFromDB);
                res.status(201).send({ status: 201, msg: "User details sent", user: user });
            } else {
                res.status(400).send({ status: 400, msg: "Sorry, User not found" });
            }
        } else {

            res.status(400).send({ status: 400, msg: "Sorry, User not found" });
        }

    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

const getAllUsers = async (req, res) => {

    try {

        const usersFromDB = await User.find();

        if (usersFromDB.length === 0) {
            res.status(400).send({ status: 400, msg: "No datas to load" });
        } else {
            res.status(201).send({ status: 201, msg: "Users list sent", list: usersFromDB });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

const updateUserById = async (req, res) => {

    try {

        const _id = req.params._id;
        const body = req.body;

        if (mongoose.isValidObjectId(_id)) {

            await User.findByIdAndUpdate(_id, { ...body });
            const updatedUser = await User.findById({ _id });
            const user = await sortDetails(updatedUser);
            res.status(200).send({ status: 200, msg: "Update Successful", user: user });
        } else {
            res.status(400).send({ status: 400, msg: "Sorry, User not found" });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

const deleteUser = async (req, res) => {

    try {

        const _id = req.params._id;

        if (mongoose.isValidObjectId(_id)) {

            const userFromDB = await User.findById({ _id });

            if (userFromDB.userType == "admin") {

                res.status(401).send({ status: 401, msg: 'Cannot delete admin user' });
            } else {

                await User.findByIdAndDelete({ _id });
                res.status(200).send({ status: 200, msg: 'User deleted successfully' });
            }

        } else {

            res.status(400).send({ status: 400, msg: "User doesn't exist" });
        }

    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

const changePassword = async (req, res) => {

    try {

        const _id = req.params._id;
        const { oldPassword, password } = req.body;

        if (mongoose.isValidObjectId(_id)) {

            const userFromDB = await User.findById({ _id });
            const isPasswordMatch = await bcrypt.compare(oldPassword, userFromDB.password);

            if (!isPasswordMatch) {

                res.status(400).send({ status: 400, msg: "Old password doesn't match" })
            } else {

                const hashedPassword = await genHashPassword(password);
                await User.findByIdAndUpdate(_id, { password: hashedPassword });
                res.status(200).send({ status: 200, msg: "Password updated successfully" })
            }
        } else {

            res.status(400).send({ status: 400, msg: "Sorry, User not found" })
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}



const registerUser = async (req, res) => {

    const { username, firstname, lastname, password, userType } = req.body;

    try {

        const doesNameExist = await User.findOne({ username });

        if (doesNameExist) {

            res.status(409).send({ status: 409, msg: 'User name already exist' });
        } else {

            const hashedPassword = await genHashPassword(password);

            await User.create({
                username: username,
                firstname: firstname,
                lastname: lastname,
                password: hashedPassword,
                userType: "view only"
            });
            res.status(201).send({ status: 201, msg: 'New user Created Successfully' });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

const loginUser = async (req, res) => {

    const { username, password } = req.body;

    try {

        const userFromDB = await User.findOne({ username });

        if (!userFromDB) {

            res.status(401).send({ status: 401, msg: "Invalid Credentials" })
        } else {

            const storedPassword = userFromDB.password;
            const isPasswordMatch = await bcrypt.compare(password, storedPassword);

            if (isPasswordMatch) {

                let user = await sortDetails(userFromDB);
                const token = jwt.sign({ _id: userFromDB._id, userType: userFromDB.userType }, process.env.PRIVATE_KEY);

                res.status(201).send({ status: 201, msg: "User login successful", token: token, user: user });
            } else {
                res.status(401).send({ status: 401, msg: "Invalid Credentials" })
            }
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

const forgotPassword = async (req, res) => {

    const { username } = req.body;

    try {

        const userFromDB = await User.findOne({ username });

        if (!userFromDB) {

            res.status(401).send({ status: 401, msg: "username does not exist" })
        } else {

            const randomString = await cryptoRandomString({ length: 10 });
            let randomToken = await jwt.sign({ randomString }, "reset_key", { expiresIn: '1h' });

            await User.findByIdAndUpdate({ _id: userFromDB._id }, { randomToken: randomToken })

            const link = `http://localhost:3000/user/resetPassword/${randomToken}`;

            await sendMail(username,
                "Password Reset Mail",
                '<p>Link to reset your account password</p></b><a href="' + link + '">' + link + '</a>');

            res.status(201).send({ status: 201, msg: "Password reset link sent to mail" });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

const resetPassword = async (req, res) => {

    const randomToken = req.params.randomToken;
    const { password } = req.body;

    try {

        jwt.verify(randomToken, "reset_key", async (error, decoded) => {

            if (error) {

                res.status(401).send({ status: 401, msg: "Password reset link expired" });
            } else if (decoded) {

                const userFromDB = await User.findOne({ randomToken: randomToken });

                if (!userFromDB) {

                    res.status(400).send({ status: 400, msg: "Worng user request" })
                } else {

                    const hashedPassword = await genHashPassword(password);
                    await User.findByIdAndUpdate(userFromDB._id, { password: hashedPassword, randomToken: null });
                    res.status(201).send({ status: 201, msg: "New Password Updated Successfully" });
                }
            }
        })
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}



const getUsersNameAndId = async (req, res) => {

    try {

        const list = await User.find({}, { firstname: 1, lastname: 1 });

        if (list.length == 0) {
            res.status(403).send({ status: 403, msg: 'No data to load' });
        } else {
            res.status(200).send({ status: 200, msg: 'User list sent', list: list });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error);
    }
}



export {
    addUser, getUserByID, getAllUsers, updateUserById, deleteUser, changePassword,
    registerUser, loginUser, forgotPassword, resetPassword, getUsersNameAndId
};