import React from 'react';
import Post from './Post/post.js';
import { useSelector } from 'react-redux';

import {useStyles} from './styles.js'
const Posts=()=>{
   
    const posts=useSelector((state)=> state.posts);

    console.log(posts);
    
    return(
        <>  
            <h1>Posts</h1>
            <Post/>
            <Post/>
            <Post/>
        </>
        
    );
}

export default Posts;