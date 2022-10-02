import {table, getMinifiedRecords,findRecordByFilter} from '../../lib/airtable'

const createCoffeeStore = async (req, res) => {
    
     if(req.method === 'POST') {

        const {id, name, address, locality, imgUrl, upvote} = req.body

        console.log(req.body.id)

        try {
            if(id) {
                const records = await findRecordByFilter(id);
                if (records.length > 0) {
                    res.json(records) 
                } else {
                    if(name ) {
                        const createRecords = await table.create([
                            {
                                fields: {
                                    id,
                                    name,
                                    address,
                                    locality,
                                    imgUrl,
                                    upvote,
                                }
                            }
                        ], function(err, records) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            records.forEach(function (record) {
                            });
                        });

                        const records = getMinifiedRecords(createRecords)
                        res.json(records) 
                        
                    } else {
                        res.status(400)
                        res.json({message: "Missing name"})
                    }
                     
                 }
            } else {
                res.status(400)
                res.json({message: "Missing id"})
            }
            
         
        }
        catch(error) {
            console.log({error:"Error with creatin or finding coffee store" })
            return res.status(500).json({message: "Error with creatin or finding coffee store"})
        }
    }
}
    


export default createCoffeeStore