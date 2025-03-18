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
    //We are replacing the creator with userID
    const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
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
    await PostMessage.findByIdAndDelete(_id);

    res.json({message:'Post deleted successfully'});
}   


//It is very similar to update post when it will take id and update the likeCount
//  with moongoose function
export const likePost=async(req,res)=>{
    const {id:_id}=req.params;   //eg post/123 =>123

    if(!req.userId) return res.json({message:'Unauthenticated user'});
    //We are checking in our database if ID is valid
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    
    const post =await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes=post.likes.filter((id)=>id != String(req.userId));
    }

    const updatedPost=await PostMessage.findByIdAndUpdate(_id,post,{new:true});

    res.json(updatedPost); //updatePost will have likeCount increased by 1
}