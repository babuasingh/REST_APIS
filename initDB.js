const mongoose = require('mongoose')



module.exports = ()=>{
    mongoose.connect(process.env.DB_URL,
{
    dbName : process.env.DB_NAME,
    user : process.env.DB_USER,
    pass :  process.env.DB_PASS,
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log('Mongodb connected');
})
.catch(err=>{
    console.log(err.message);
})


mongoose.connection.on('connected', ()=>{
    console.log("MongoDB connected to the Database");
})


mongoose.connection.on('error',err=>{
    console.log(err.message)
})


mongoose.connection.on('disconnected',()=>{
    console.log("Mongoose connection is disconnected from DB");
})


process.on('SIGINT',()=>{
    mongoose.connection.close(()=>{
        console.log("Mongoose connection is disconnected from the DB due to app termination");
        process.exit(0);
    })
    // process.exit(0)
})
}