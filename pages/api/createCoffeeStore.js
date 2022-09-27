import {table, getMinifiedRecords} from '../../lib/airtable'

const createCoffeeStore = async (req, res) => {
    
    if(req.method === 'POST') {

        const {id,name, address, upvote, locality, imgUrl} = req.body

        try {
            if(id) {
                const findCoffeeStoreRecords = await table.select({
                    filterByFormula: `id="${id}"`}).firstPage()
            
                if (findCoffeeStoreRecords.length > 0) {
                    const records = getMinifiedRecords(findCoffeeStoreRecords)
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
                                    upvote: 0,
                                }
                            }
                        ], function(err, records) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            records.forEach(function (record) {
                                console.log(record.getId());
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