const mongoose = require('mongoose');

async function connect(){
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect('mongodb+srv://thanhanhynh:luu123999@resraurent.lvjuro0.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindandModify: false
          })
        console.log("Success!!")
    } catch (error) {
        console.log("ERRO");
        process.exit()
    }

}

module.exports = {connect}