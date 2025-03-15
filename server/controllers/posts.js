import mongoose from "mongoose";
import PostMessage from "../models/postmessages.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);  
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } 
    catch (error) {
        res.status(409).json({ message: error.message });
    }
    
}
// post/123 so req.param will take 123
export const updatePost = async (req, res) => {
    const { id :_id} =req.params;
    const post=req.body;
    
    //We are checking in our database  
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatePost=await PostMessage.findByIdAndUpdate(_id,post,{new:true});

    res.json(updatePost);
}

// post/123 so req.param will take 123
export const deletePost=async(req,res)=>{
    const {id :_id}=req.params;
    
    //We are checking in our database if ID is valid
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    //So id 123 as been removed 
    await PostMessage.findByIdAndRemove(id);

    res.json({message:'Post deleted successfully'});
}   