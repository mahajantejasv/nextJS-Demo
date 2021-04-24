import {MongoClient} from 'mongodb'

async function handler(request, response) {
    if(request.method === 'POST') {
        let data = request.body;
        const client = await MongoClient.connect('mongodb+srv://testUser:testPassword@democluster.7km74.mongodb.net/meetups?retryWrites=true&w=majority');
        const dataBase = client.db();
        const meetUpsCollections = dataBase.collection('meetups')
        let result = await meetUpsCollections.insertOne(data);
        console.log(result);
        client.close();
        response.status(200);
    }
    return response.json('hola');
}
export default handler;