import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    title:{
        type:String,
    },
    body:{
        type:String,
    }

},{
    timestamps:true
})


export const PostSchema = mongoose.model('posts',postSchema)


