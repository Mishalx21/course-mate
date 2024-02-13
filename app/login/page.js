'use client';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, TextField, Link, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  image: {
    width: '185px',
    marginBottom: theme.spacing(1),
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '.3rem',
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      height: '100vh',
    },
  },
  button: {
    marginTop: theme.spacing(2),
    width: '100%',
    backgroundColor: '#000000', // Black background for buttons
    color: '#ffffff', // White text color for buttons
  },
  blackText: {
    color: '#000000', // Black text color
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.formContainer}>
            <div className={classes.formContainer}>
              <img src="logo.png" className={classes.image} alt="logo" />
              <Typography variant="h4" gutterBottom className={classes.blackText}>We are The Lotus Team</Typography>
              <Typography variant="body1" paragraph className={classes.blackText}>Please login to your account</Typography>
              <TextField label="Email address" variant="outlined" fullWidth margin="normal" className={classes.blackText} />
              <TextField label="Password" variant="outlined" fullWidth margin="normal" type="password" className={classes.blackText} />
              <Button variant="contained" className={classes.button}>Sign in</Button>
              <Link href="#" variant="body2" className={classes.blackText}>Forgot Password?</Link>
              <Typography variant="body2" paragraph style={{ marginTop: '16px' }} className={classes.blackText}>Don't have an account?</Typography>
              <Button variant="outlined" className={classes.blackText}>Create Account</Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>We are more than just a company</Typography>
            <Typography variant="body1" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
