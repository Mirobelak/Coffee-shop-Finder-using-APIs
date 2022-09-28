import {findRecordByFilter} from '../../lib/airtable'


const getCoffeeStoreById = async (req, res) => {
    const { id } = req.query;

    try {
        if(id) {
            
            const records = await findRecordByFilter(id);

            if (records.length > 0) {
                res.json(records) 
            } else {
                res.json({message: "Id could not be found"})
            }
        } else {
            res.status(400).json({message: "id is missing"})
        }
       
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: "Somtething went wrong" });
    }
    }

    export default getCoffeeStoreById;