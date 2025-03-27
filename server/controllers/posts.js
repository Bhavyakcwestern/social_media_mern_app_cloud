import mongoose from "mongoose";
import PostMessage from "../models/postmessages.js";
import Comment from "../models/comment.js";

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
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        console.log('Creating post:', newPost); 
        await newPost.save();
        res.status(201).json(newPost);
    } 
    catch (error) {
        console.error('Error creating post:', error); 
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(_id);

    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

export const addComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(postId)) 
        return res.status(404).send('No post with that id');

    try {
        const newComment = new Comment({
            content,
            creator: req.userId,
            post: postId
        });

        await newComment.save();

        const populatedComment = await Comment.findById(newComment._id)
            .populate('creator', 'name');

        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getPostComments = async (req, res) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) 
        return res.status(404).send('No post with that id');

    try {
        const comments = await Comment.find({ post: postId })
            .populate('creator', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(commentId)) 
        return res.status(404).send('No comment with that id');

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) return res.status(404).send('Comment not found');

        if (comment.creator.toString() !== req.userId) 
            return res.status(403).json({ message: 'Not authorized to delete this comment' });

        await Comment.findByIdAndRemove(commentId);

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}