import React,{useState,useEffect} from 'react';
import { Container, AppBar, Typography, Grow, Grid, Button } from '@material-ui/core';
import photos from './images/memories.png';
import { useDispatch } from 'react-redux';

import Form from './components/Form/form.js';
import Posts from './components/Posts/posts.js';
import useStyles from './styles.js';
import {getPost} from './actions/posts.js' 
import Navbar from './components/Navbar/Navbar.js';

const App = () => {
    const [currentId,setCurrentId]=useState(null);  //Prop passing to Form.js and Posts.js
    const classes = useStyles();
    const dispatch=useDispatch();

    //We are mounting our post using dispatch->Action
    useEffect(()=>{
        dispatch(getPost());
    },[currentId,dispatch]);
    
    return (
        <div>
            <Container maxwidth="lg">
                <Navbar/>
            </Container>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    );
}

export default App;