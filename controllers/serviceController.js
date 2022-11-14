import Service from '../models/serviceSchema.js';
import mongoose from 'mongoose';
import { serviceReqMail } from '../helper/mail.js'


async function createServiceReq(req, res) {

    try {

        const payload = req.body;

        const titleexist = await Service.exists({ serviceTitle: payload.serviceTitle });

        if (titleexist) {

            await res.status(409).send({ status: 409, msg: 'Title already exists' });
        } else {

            const service = await Service.create(payload);
            serviceReqMail(service.serviceTitle, service._id);
            res.status(201).send({ status: 201, msg: 'Service Request Created Successfully' });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

async function getServices(req, res) {

    try {

        const skip = req.params.skip

        const services = await Service.find().populate('assignedUser', 'firstname lastname')
            .populate('contact', 'firstname lastname').skip(skip).limit(skip + 20);

        if (services.length === 0) {

            res.status(403).send({ status: 403, msg: skip === 0 ? 'No data to load' : 'No more data to load' });
        } else {

            res.status(201).send({ status: 201, msg: 'data sent', services: services });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

async function getById(req, res) {

    try {

        const _id = req.params._id

        if (mongoose.isValidObjectId(_id)) {

            const service = await Service.findById({ _id }).populate('assignedUser', 'firstname lastname')
                .populate('contact', 'firstname lastname');

            if (service) {

                res.status(201).send({ status: 201, msg: 'Service Request Sent', service: service });
            } else {
                res.status(400).send({ status: 400, msg: 'Service Request not exist' });
            }
        } else {
            res.status(400).send({ status: 400, msg: 'Service Request not exist' });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

async function getServicesByTitle(req, res) {

    try {

        const title = await req.params.title;
        const skip = await req.params.skip;

        const services = await Service.find({ serviceTitle: { $regex: title, $options: "i" } }).skip(skip).limit(skip + 20);

        if (services.length === 0) {
            res.status(403).send({ status: 403, msg: skip == 0 ? 'No matching data to load' : 'No more data to load' });
        } else {
            res.status(201).send({ status: 201, msg: 'data sent', services: services });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

async function updateById(req, res) {

    try {

        const _id = req.params._id;
        const payload = req.body;

        if (mongoose.isValidObjectId(_id)) {

            await Service.findByIdAndUpdate(_id, { ...payload });
            const service = await Service.findById({ _id });
            res.status(201).send({ status: 200, msg: 'Update Successful', service: service });
        } else {

            res.status(401).send({ status: 400, msg: 'Service Request not exist' });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

async function deleteById(req, res) {

    try {

        const _id = req.params._id;

        if (mongoose.isValidObjectId(_id)) {

            await Service.findByIdAndDelete(_id);
            res.status(200).send({ status: 200, msg: 'Service request deleted successfully' });
        } else {

            res.status(401).send({ status: 400, msg: 'Service Request not exist' });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}


export { getServices, getServicesByTitle, createServiceReq, getById, updateById, deleteById }