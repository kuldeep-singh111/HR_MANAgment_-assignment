const mongoose = require("mongoose")

const ConnectToDB = (url) => {


    return mongoose.connect(url)
}

module.exports = { ConnectToDB };


