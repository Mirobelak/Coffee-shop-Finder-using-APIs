import {findRecordByFilter, table} from '../../lib/airtable'

const upvoteCoffeeStoreById = async (req, res) => {

    if(req.method === 'PUT') {

        try {
            const {id} = req.body
            
            if(id){
            const records = await findRecordByFilter(id);
            
            if (records.length > 0) {

                const record = records[0]

                const calculateUpvote = parseInt(record.upvote) + 1

                // update the record

                const updateRecord = await table.update([
                    {
                        id: record.recordId,
                        fields: {
                            upvote: calculateUpvote
                        }
                    }
                ])

                if(updateRecord) {
                    res.json(updateRecord)
                }

            } else {
                res.json({message: "Coffee Store id does not exists"})
            }
        } else {
            res.status(400).json({message: "Missing id"})
        }           

        } catch(err) {
            res.status(500).json({message: "Error with upvoting coffee store", err})
            console.log("Error with upvoting coffee store", err)
        }
        
    }

   
}

export default upvoteCoffeeStoreById