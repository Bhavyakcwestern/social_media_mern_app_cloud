import React from 'react'
import { AppBar,Typography} from '@material-ui/core';
import photos from '../../images/memories.png';
import useStyles from './styles.js';

const Navbar = () => {
const classes=useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography className={classes.heading} variant="h2" align="center">PhotoHub</Typography>
                    <img className={classes.image} src={photos} alt="photos" height="60" />
                    {/* <Button color="primary" variant="contained" className={classes.loginButton}>Login</Button> */}
    </AppBar>
  )
}

export default Navbar