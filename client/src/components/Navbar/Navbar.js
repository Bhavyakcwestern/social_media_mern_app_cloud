import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import photos from '../../images/memories.png';
import useStyles from './styles.js';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import { logout } from '../../actions/auth';

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();  //  useHistory() for React Router v5
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);

  const handleLogout = () => {
    dispatch(logout(history));
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
  }, [location, user?.token]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">PhotoHub</Typography>
        <img className={classes.image} src={photos} alt="photos" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>
              {user?.result?.name?.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>{user?.result?.name}</Typography>
            <Button onClick={handleLogout} variant="contained" className={classes.logout} color="secondary">Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Log in</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;