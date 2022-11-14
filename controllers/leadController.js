import Lead from '../models/leadSchema.js'
import mongoose from "mongoose";
import { leadMail } from '../helper/mail.js'


async function getLeads(req, res) {

    try {

        const skip = await req.params.skip;

        const leads = await Lead.find().populate('assignedUser', 'firstname lastname')
            .populate('contact', 'firstname lastname').skip(skip).limit(skip + 20);

        if (leads.length === 0) {
            res.status(403).send({ status: 403, msg: skip === 0 ? 'No data to load' : 'No more data to load' });
        } else {
            res.status(201).send({ status: 201, msg: 'data sent', leads: leads });
        }
    } catch (error) {

        res.status(400).send({ status: 401, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

async function getLeadsByTitle(req, res) {

    try {

        const title = await req.params.title;
        const skip = await req.params.skip;

        const leads = await Lead.find({ leadTitle: { $regex: title, $options: "i" } }).populate('assignedUser', 'firstname lastname')
            .populate('contact', 'firstname lastname').skip(skip).limit(skip + 20);

        if (leads.length === 0) {
            res.status(403).send({ status: 403, msg: skip == 0 ? 'No matching data to load' : 'No more data to load' });
        } else {
            res.status(201).send({ status: 201, msg: 'data sent', leads: leads });
        }
    } catch (error) {

        res.status(400).send({ status: 401, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

async function createLead(req, res) {

    try {

        const payload = await req.body;

        const titleexist = await Lead.exists({ leadTitle: payload.leadTitle });

        if (titleexist) {
            await res.status(409).send({ status: 409, msg: 'Lead title already exists' });
        } else {
            const lead = await Lead.create(payload);
            leadMail(lead.leadTitle, lead._id);
            await res.status(201).send({ status: 201, msg: 'New lead created' });
        }
    } catch (error) {

        res.status(400).send({ status: 401, msg: 'Something went wrong' });
        console.log(error.message);
    }

}

async function getLeadById(req, res) {

    try {

        const _id = await req.params._id;

        if (mongoose.isValidObjectId(_id)) {

            const lead = await Lead.findById({ _id }).populate('assignedUser', 'firstname lastname')
                .populate('contact', 'firstname lastname');

            if (lead) {
                res.status(201).send({ status: 201, msg: 'Lead sent', lead: lead });
            } else {
                res.status(400).send({ status: 401, msg: "Lead doesn't exist" });
            }
        } else {
            res.status(400).send({ status: 401, msg: "Lead doesn't exist" });
        }
    } catch (error) {

        res.status(400).send({ status: 401, msg: 'Something went wrong' });
        console.log(error.message);
    }


}

async function updateById(req, res) {

    try {

        const _id = await req.params._id;
        const data = await req.body;

        if (mongoose.isValidObjectId(_id)) {

            await Lead.findByIdAndUpdate(_id, { ...data });
            const lead = await Lead.findById({ _id });
            res.status(201).send({ status: 201, msg: 'Update Successful', lead: lead });
        } else {

            res.status(401).send({ status: 400, msg: 'Lead not exist' });
        }
    } catch (error) {

        res.status(400).send({ status: 401, msg: 'Something went wrong' });
        console.log(error.message);
    }

}

async function deleteById(req, res) {

    try {

        const _id = await req.params._id;

        if (mongoose.isValidObjectId(_id)) {

            await Lead.findByIdAndDelete(_id);
            res.status(200).send({ status: 200, msg: 'Lead deleted successfully' });
        } else {

            res.status(401).send({ status: 400, msg: 'Lead not exist' });
        }
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}

export { getLeads, getLeadsByTitle, createLead, getLeadById, updateById, deleteById }