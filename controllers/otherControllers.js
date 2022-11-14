import Lead from '../models/leadSchema.js'
import Service from '../models/serviceSchema.js';
import Contact from '../models/contactSchema.js';


async function getDocCounts(req, res) {

    try {

        const leadCount = await Lead.count();
        const serviceCount = await Service.count();
        const contactCount = await Contact.count();

        res.status(201).send({
            status: 201, msg: 'Documents count sent',
            leadCount: leadCount, serviceCount: serviceCount, contactCount: contactCount
        })
    } catch (error) {

        res.status(400).send({ status: 400, msg: 'Something went wrong' });
        console.log(error.message);
    }
}


export { getDocCounts };