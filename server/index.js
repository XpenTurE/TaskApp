const express = require("express")
const app = express();
const cors = require("cors");
const { default: mongoose, mongo } = require("mongoose");
app.use(express.json())
app.use(cors())

    mongoose
    .connect(
      'mongodb://localhost:27017/task'
    )
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log("This is the Error :    " + err));

const taskSchema = mongoose.Schema({
    title:String,
    description:String,
})

const Task = mongoose.model("Task",taskSchema)

app.post("/task",async (req,res)=>{
    const {title, description} = req.body;
    const taskObj = {
        title,
        description
    }
    try{
        const response = await Task.create(taskObj)
        res.status(201).json({message:"Task created",response})
    }
    catch(err){
        res.status(403).json({message:"Cannot Upload Task"})
    }
})

app.get("/task/:id",async (req,res)=>{
    const id = req.params.id;
    try{
        const response = await Task.findOne({_id:id})
        console.log(response)
        res.status(201).json({message:"Task Found",response})
    }
    catch(err){
        res.status(403).json({message:"Cannot Upload Task"})
    }
})

app.post("/task/:id", async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    try {
        const response = await Task.findOneAndUpdate(
            { _id: id },
            { title, description },
            { new: true } // to get the updated document
        );

        if (response) {
            res.status(200).json({ message: "Task updated", response });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating task", error: err.message });
    }
});


app.get("/task",async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.status(201).json({tasks})
    }
    catch(err){
        res.status(403).json({message:"Cannot Get Tasks"})
    }
})

app.delete("/task/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const response = await Task.findOneAndDelete({ _id: id });
  
      if (response) {
        res.status(200).json({ message: "Task deleted", response });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error deleting task", error: err.message });
    }
  });

app.listen(3000,()=>{
    console.log("Server is listenting on port 3000")
})