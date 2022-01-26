const mongoose = require('mongoose');

const dbConnection = async () => {

    const URI = process.env.DB_CNN;


    try {

        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, () => console.log('DB online'));



    } catch (error) {
        // console.log(error);
        throw new Error('Error en la base de datos - Comuníquese con el admin');
    }
}

module.exports = { dbConnection }