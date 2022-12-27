const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://test:test@cluster0.6ku5emq.mongodb.net/?retryWrites=true&w=majority')


const studentSchema = new mongoose.Schema({
    username: String,
    email: String
})

const postSchema = new mongoose.Schema({
    title: String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'}
})

const Student = mongoose.model("Student", studentSchema)
const Post = mongoose.model('Post', postSchema)

// Student.create({username: "student1", email: "student1@yopmail.com"}, function(err, res){
//     Post.create({title: "post1", postedBy: res._id})
// })

// Student.create({username: "student2", email: "student2@yopmail.com"}, function(err, res){
//     Post.create({title: "post2", postedBy: res._id})
// })


// let createStudent2 = Student.create({username: "student2", email: "student2@yopmail.com"})
// Post.create({title: "post2", postedBy: createStudent2._id})

Post.find().populate("postedBy").then((res)=>{
    console.log(res)
})
// console.log(postResult)
