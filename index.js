const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()
const app = express();

//middleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i8hxp3j.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const userDataCollection = client.db(`hellWelSoft`).collection(`usersdata`)
        const usersCollection = client.db(`hellWelSoft`).collection(`users`)

        app.post('/usersdata', async (req, res) => {
            const users = req.body;
            const resualt = await userDataCollection.insertOne(users)
            res.send(resualt)
        })

        app.get('/usersData', async (req, res) => {
            const query = {}
            const resualt = await userDataCollection.find(query).toArray()
            res.send(resualt)
        })

        app.get('/usersData', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const resualt = await userDataCollection.findOne(query).toArray()
            res.send(resualt)
        })

        app.delete('/usersData/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const resualt = await userDataCollection.deleteOne(query);
            res.send(resualt)
        })

        app.put('/usersdata/:id', async (req, res) => {
            const id = req.params.id; 
            const body = req.body;
            const filter = { _id: new ObjectId(id) }
            const option = { upsert: true }
            const updatedDoc = {
                $set: {
                    title : body.title,
                    details : body.details
                }
            }
            const result = await userDataCollection.updateOne(filter, updatedDoc, option);
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            const users = req.body;
            console.log(users)
            const resualt = await usersCollection.insertOne(users)
            res.send(resualt)
        })

        app.get('/users', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const resualt = await usersCollection.findOne(query)
            res.send(resualt)
        })

    }
    finally {

    }
}
run().catch(err => console.log(err))




//test
app.get('/', async (req, res) => {
    res.send('Todo app portal running')
})

app.listen(port, () => console.log(`Todo app portal running on ${port}`))