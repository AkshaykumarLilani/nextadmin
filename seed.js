require("dotenv").config();
const { MongoClient } = require('mongodb');
const faker = require('faker');

const uri = process.env.MONGO_URL;

const generateDummyData = {
    forUser: () => {
        const data = [];

        for (let i = 0; i < 1000; i++) {
            const entry = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                isAdmin: faker.random.boolean(),
                isActive: faker.random.boolean(),
                img: "https://picsum.photos/200",
                createdAt: faker.date.past().toISOString()
            };

            data.push(entry);
        }

        return data;
    },
    forProduct: () => {
        const data = [];

        const generatedTitles = new Set();

        const generateUniqueTitle = () => {
            let title = faker.commerce.productName();
            while (generatedTitles.has(title)) {
                title = faker.commerce.productName();
            }
            generatedTitles.add(title);
            return title;
        };

        for (let i = 0; i < 1000; i++) {
            const product = {
                title: generateUniqueTitle(),
                desc: faker.lorem.sentences(),
                price: faker.random.number({ min: 10, max: 200, precision: 0.01 }),
                stock: faker.random.number({ min: 0, max: 100 }),
                img: "https://picsum.photos/300",
                color: faker.commerce.color(),
                size: faker.random.arrayElement(['Small', 'Medium', 'Large']),
                createdAt: faker.date.past().toISOString()
            };

            data.push(product);
        }

        return data;
    }
}

const saveDummyDataToMongoDB = {
    forUser: async () => {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            await client.connect();
            console.log('Connected to MongoDB');

            const database = client.db('nextadmin');
            const collection = database.collection('users');

            const dummyData = generateDummyData.forUser();
            await collection.deleteMany();
            const result = await collection.insertMany(dummyData);

            console.log(`${result.insertedCount} documents inserted to MongoDB`);
        } finally {
            await client.close();
            console.log('Connection to MongoDB closed');
        }
    },
    forProduct: async () => {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            await client.connect();
            console.log('Connected to MongoDB');

            const database = client.db('nextadmin');
            const collection = database.collection('products');

            const dummyData = generateDummyData.forProduct();
            await collection.deleteMany();
            const result = await collection.insertMany(dummyData);

            console.log(`${result.insertedCount} documents inserted to MongoDB`);
        } catch (err) {
            console.error(err);
        }
        finally {
            await client.close();
            console.log('Connection to MongoDB closed');
        }
    }
}

saveDummyDataToMongoDB.forUser();
saveDummyDataToMongoDB.forProduct();
