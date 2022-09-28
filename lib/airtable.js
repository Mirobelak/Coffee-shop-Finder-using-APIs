const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.BASE_ID);

const table = base('Coffee Stores')

const getMinifiedRecords = (records) => {
   return records.map((record) => {
        return {
            recordId: record.id,
            ...record.fields,
        }
    })
}

const findRecordByFilter = async (id) => {
    const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id="${id}"`}).firstPage()

    return getMinifiedRecords(findCoffeeStoreRecords)

}

export { table, getMinifiedRecords, findRecordByFilter }
