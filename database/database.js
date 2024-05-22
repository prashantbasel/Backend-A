const mongoose = require('mongoose')

// External file
// Function (Connection)
// Make a unique function name 
// export 

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_CLOUD).then(()=>{
    console.log("Database connected ")
})
}

//Exporting the function 
module.exports = connectDatabase
