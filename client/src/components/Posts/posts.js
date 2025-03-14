import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/post.js';
import { useSelector } from 'react-redux';

import useStyles from './styles.js'; 

const Posts = ({ setCurrentId }) => { //Will pass setCurrentId to Post.js
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
  
    return (
      !posts.length ? <CircularProgress /> : (    //posts.length=0 means false !false=true so loading bar will be there
        //We are now going to populate/put each single post in a grid with help of map
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
 
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post} setCurrentId={setCurrentId} /> 
            </Grid>
          ))}
        </Grid>
      )
    );
};

export default Posts;