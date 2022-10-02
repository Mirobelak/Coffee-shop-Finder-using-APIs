import { fetchCoffeeStores } from "../../lib/coffee-stores";

const GetCoffeeStoreByLocation = async (req,res) => {
    try {
        const {latLong,limit} = req.query;
        const response = await fetchCoffeeStores(latLong, limit)
        res.status(200)
        res.json(response)
    }
    catch(error) {
        console.log({error})
        res.status(500).json({error})
    }
    

    
}

export default GetCoffeeStoreByLocation