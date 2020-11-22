import React from 'react';
import { Box, Button, Link, Paper, TextField, Typography } from '@material-ui/core';
import GoogleIcon from '../components/icons/GoogleIcon';
import redpig from '../images/redpig.svg';
import '../sass/login.scss';

export default function LoginPage() {
  return (
    <div className='root__auth'>
      <Paper className='login__paper' elevation={10}>
        <img src={redpig} alt='pig' width='150px' style={{ marginLeft: 5 }} />

        <Typography variant='h4' style={{ fontWeight: 'bold' }}>
          Welcome back
        </Typography>

        <Typography variant='subtitle1'>
          Frugal is an all-in-one wealth management and smart budgeting app that brings your financial data and saving
          goals together.
        </Typography>

        <Button
          variant='contained'
          style={{ backgroundColor: 'white' }}
          href='https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fredirect&response_type=token&scope=email%20profile&client_id=325405962580-brrmd4g4qej10hq5r4vvbktjdnjd0tb9.apps.googleusercontent.com'>
          <span style={{ marginRight: '5px' }}>
            <GoogleIcon />
          </span>
          Log in with Google
        </Button>

        <Typography variant='caption'>
          You can also log in with your{' '}
          <span>
            <Link href='/login/email' color='secondary'>
              email
            </Link>
          </span>
          .
        </Typography>
      </Paper>
      <Typography variant='caption' style={{ textAlign: 'center' }}>
        No account?{' '}
        <Link href='/signup' color='secondary'>
          Sign up
        </Link>
      </Typography>
    </div>
  );
}
