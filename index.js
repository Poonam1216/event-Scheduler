const express = require('express');
require("./connection/conn");
const Eventtype = require("./modules/event");

const app = express();

app.use(express.json());

app.post("/event", async(req, res)=>{
    try {
        const { title, description, location, startTime, endTime} = req.body
        if(req?.body?.title == ""){
            return res.status(400).json({
                "error": "Validation Error: title is required"
            })
        }

        let insertEvent = await Eventtype.create({
            title,
            description,
            location,
            startTime,
            endTime
        })

       
       return res.status(201).json({
        message: "success",
        insertEvent
       });
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

app.get("/event" , async(req, res)=>{
    try{
        let list = await Eventtype.find();
        return res.status(200).json({
            message: "Ok",
            list
        })
    }catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})



app.get("/event/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        let specificUser = await Eventtype.findById(id);
        return res.status(200).json({
            message: "Ok",
            specificUser
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})


app.delete("/event/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        let specificUser = await Eventtype.findByIdAndDelete(id);
        return res.status(204).send()
    } catch (e) {
        res.status(404).json({
            message: "There is no event with that Particular id"
        })
    }
});

app.put("/event/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        if(req?.body?.title == ""){
            return res.status(400).json({   
                "error": "Validation Error : title is required"
            })
        }

        let update = await Eventtype.findOneAndUpdate(id, {
            $set: {
                data: req.body
            }
            })
            return res.status(200).json({
                message: "Ok",  
                update
            })
    } catch (e) {
        res.status(404).json({
            message: "There is no event with that Particular id"
        })
    }
});


app.listen(4000, ()=>{
    console.log("Server is started");
})