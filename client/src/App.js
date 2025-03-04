import React from 'react';
import { Container, AppBar, Typography, Grow, Grid, Button } from '@material-ui/core';
import photos from './images/memories.png';

import Form from './components/Form/form.js';
import Posts from './components/Posts/posts.js';
import useStyles from './styles.js';

const App = () => {
    const classes = useStyles();
    return (
        <div>
            <Container maxwidth="lg">
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography className={classes.heading} variant="h2" align="center">PhotoHub</Typography>
                    <img className={classes.image} src={photos} alt="photos" height="60" />
                    <Button color="primary" variant="contained" className={classes.loginButton}>Login</Button>
                </AppBar>
            </Container>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    );
}

export default App;