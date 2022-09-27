const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.BASE_ID);

const table = base('Coffee Stores')

const getMinifiedRecords = (records) => {
   return records.map((record) => {
        return {
            ...record.fields,
        }
    })

}

export { table, getMinifiedRecords }
