import mongoose from "mongoose";

const URI = `mongodb+srv://broomstick:${process.env.DBPASSWORD}@cluster0.lwbtsfs.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`



const dbconnect = async () => {
    try {
        await mongoose.connect(URI, {
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
});;

export default dbconnect