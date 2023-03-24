const mongoose = require('mongoose');   
mongoose.connect("mongodb+srv://poonam:poonam@cluster0.qrosp25.mongodb.net/?retryWrites=true&w=majority",{
}).then(()=>{
    console.log("Connected to MongoDB");
}).catch((e)=>{
    console.log("Could not connect to MongoDB");
})