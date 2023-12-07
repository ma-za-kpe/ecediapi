import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DBNAME || "mydatabase";
const dbPort = process.env.DBPORT || 27017;
const dbURL = process.env.DATABASE_URL || `mongodb://localhost:${dbPort}/${dbName}`;

const dbconnect = async () => {
    try {
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Error connecting to MongoDB database:', error);
    }
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

export default dbconnect;


// import mongoose from "mongoose";

// const URI = `mongodb+srv://broomstick:${process.env.DBPASSWORD}@cluster0.lwbtsfs.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

// const dbconnect = async () => {
//     try {
//         await mongoose.connect(URI);
//         console.log('Connected to MongoDB database');
//     } catch (error) {
//         console.error('Error connecting to MongoDB database:', error);
//     }
// }

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//     console.log("Connected successfully");
// });;

// export default dbconnect


// POLYGONSCAN_API_KEY=GN66MU7PWWZCDJQAES1R6ZUG712VHCY6MN
// PRIVATE_KEY=dfad9e21fbf40c54dde89bc9346a039101fd273ad3e4b4d4ee754079c5a12263
// # DATABASE_URL=mongodb+srv://AbZKQDXmKINrWJbj:AbZKQDXmKINrWJbj@cluster0.lwbtsfs.mongodb.net/?retryWrites=true&w=majority
// # DBPASSWORD=MksFV70DWf6BAITa
// # DBUSER=broomstick
// # DBNAME=creditlink

// DBNAME=mydatabase
// DBPASSWORD=
// DBPORT=27017
// DATABASE_URL=mongodb://localhost:27017/mydatabase

// JWT_SECRET=MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDESN9mLkglN3Wq
// CMPOzEIlQQM7K249qF+UWfEF43MdKjRKM95A97v5cFr58uJaPbExs90bJ7Lo+ICL
// Xk6Q0AKKCtbXrQBzj+No0oPraJs32BiMVDVWRYGkvxTqB/Apt4Qy4L8YKeXZ3FDl
// CTvBvIsQXO0miyIOkAoU66ZaAO40kPZhcCM/1e9kxe8ocs4MC5jEd/bUZGsWazfB
// ZoIxWn5ZLTgJpQ7ur35+rhg9fOfNzt8EseAVBHUuGYeebb5GYVBaSKPWXK7yKP1l
// a6E6dYsHIC8FoaOPhVUF5astp3DpPS8PyxA8p+x/gde/iFCQHXIyeX/LZvJlcbC+
// ns97vDPjAgMBAAECggEAKpSIafk2S2SJkPZPy+fBnaVJ1ycnxhZljaApSha6XSRP
// rZ0s5LkZPRZjlf9bnSnu65JSL9bf1+w4roMp1f5Z3qpVSvpLs8YOFio81e+eZHHr
// eV23KFzxr9SH6/EG53XZJtRcgBhutWE250imfvOw0z7lb0wVekVC+qDYOIQlKJ+8
// c0kAt5d1ITxCV6dpP0eX7vC5xQUgrjdTgqrx0YXifNOzueG3DpPycSqBiqDBC4HZ
// 22XZHNHv3Ba0yuKcnjBMACHJIePTl03klh4Kch5b92ZJBFKA/UPO2HD5pMmRLrn7
// tZ67EB/AhNAm/HvmPRaLWmkK9Yt5yRc/zLI2ZRlnMQKBgQDuM76IqMlmUMP6CLg+
// SFAVYVmMMwfb3q3J3VA+lmR7GLXP+ZNDWaNtH6QKzZOcAOTaoC6GViU2HMvDRQaR
// wJatMe7MG21iYWGey0ryYE8SPdzv5jvwxQ0ZeDWAilz8AtloyD/8gtCsbQuPPV5q
// 3q2DzZmYcHmR+DB7Q52GMNnQewKBgQDS81gcaDFPWr+lkoHg6G7NHVlt7huK/3y3
// 6o+n6WczuxaJ+gobhrtYBvOs7/N1LMiAE1g3Lcq5fnxVj9kFSjDyjx5YFlGttXex
// N1mgts6LQ+tQEu1j/4VSSpSrPs9mZjvT+L0IeXPXmwe1T5poVNCsPRKoYB+Suh/T
// nZPXKTcxuQKBgQDf1o4Ye4vucr0Gq8T++hMPVFDC131uFt320NrERa0co8bOLfg9
// lPFm7RHI+Q/ZzFlCPL4bjL4hEIRF9gpLUtAE5uRAtxFeHqaOgvjltKz5Nlr0sMTo
// 5zL9GSIlrV/djYvh1DOUxRT0wu/W5dNg1+nz7nOEdUU4byKX4p0XabZ1GwKBgAjs
// /PxuuC9oYpWJ5m7yxsVtCXyqR4YRG2DYzu1G5fP9ZY2/A7B4efLWkHbvzDhYBb/N
// kbz79gj1PiOMq50ar4mD3r/RafFUrVTVR7iSI5km7Yz80AicJjL+Lt40ESh/COcG
// LlFueiVUTPYyARGLDS1MhD6VmqBlubUFhNzkxI4ZAoGAId5CuUREOWLfF6L1qkOa
// dl4USBUmZS+flLWI1uhXppGuCcqed8ps+KknNPKC/Mb0aI9E5R9jofpUu47bvIIF
// h7u2ghhuLeu5gVaUdj5Fjw9dPqEFAIKNZVF6CUX04AfdRZsm9XwJBxynEU+b9Bpd
// A6mjkeYQjao8VOHPPjv6cQQ=