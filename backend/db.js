const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://root:root@inotebookdb.xwywtxp.mongodb.net/inotebookdb?retryWrites=true&w=majority";

const connectToMongo = async () => {
    await mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connection Successful!");
        })
}

module.exports = connectToMongo;