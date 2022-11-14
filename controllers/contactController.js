import Contact from '../models/contactSchema.js';
import mongoose from 'mongoose';



async function createContact(req, res) {

    try {

        const data = await req.body;
        await Contact.create(data);
        res.status(201).send({ status: 201, msg: 'New contact created successfully' });
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

async function getContacts(req, res) {

    try {

        const skip = await req.params.skip;
        let data = await Contact.find().sort({ firstname: 1 }).skip(skip).limit(skip + 20);

        if (data.length === 0) {
            res.status(403).send({ status: 403, msg: skip === 0 ? 'No data to load' : 'No more data to load' });
        } else {
            res.status(200).send({ status: 200, msg: 'data sent', data: data });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

async function getContactsByName(req, res) {

    try {

        const skip = await req.params.skip;
        const firstname = await req.params.firstname;

        let data = await Contact.find({ firstname: { $regex: firstname, $options: "i" } })
            .skip(skip).limit(skip + 20);

        if (data.length === 0) {
            res.status(403).send({ status: 403, msg: skip == 0 ? 'No matching data to load' : 'No more data to load' });
        } else {
            res.status(200).send({ status: 200, msg: 'data sent', data: data });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

async function getContactById(req, res) {

    try {

        const _id = await req.params._id;

        if (mongoose.isValidObjectId(_id)) {

            let data = await Contact.findById(_id);

            if (data) {
                res.status(200).send({ status: 200, msg: 'data sent', data: data });
            } else {
                res.status(400).send({ status: 400, msg: 'User not exist' });
            }
        } else {

            res.status(400).send({ status: 400, msg: 'User not exist' });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something wrong' });
        console.log(error.message);
    }
}

async function updateContactById(req, res) {

    try {

        const _id = await req.params._id;
        const data = await req.body;

        if (mongoose.isValidObjectId(_id)) {

            await Contact.findByIdAndUpdate(_id, { ...data })
            const contact = await Contact.findById({ _id });
            res.status(200).send({ status: 200, msg: 'Updation successful', contact: contact });
        } else {

            res.status(400).send({ status: 400, msg: 'User not exist' });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

async function deleteContactById(req, res) {

    try {

        const _id = await req.params._id;

        if (mongoose.isValidObjectId(_id)) {

            await Contact.findByIdAndDelete(_id);
            res.status(200).send({ status: 200, msg: 'Contact deleted' });
        } else {

            res.status(400).send({ status: 400, msg: 'User not exist' });
        }
    } catch (error) {

        await res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}



async function getContactsNameAndId(req, res) {

    try {

        const name = await req.params.name

        const list = await Contact.find({
            $or: [{ firstname: { $regex: name, $options: 'i' } },
            { lastname: { $regex: name, $options: 'i' } }]
        }, { firstname: 1, lastname: 1 })

        if (list.length == 0) {
            res.status(403).send({ status: 403, msg: 'No data to load' });
        } else {
            res.status(200).send({ status: 200, msg: 'Contact list sent', list: list });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}



export {
    createContact, getContacts, getContactsByName, getContactById,
    updateContactById, deleteContactById, getContactsNameAndId
}