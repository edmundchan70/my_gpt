import { Avatar, Box, Button, Container, Divider, FormControl, Grid, Grow, Paper, SxProps, TextField, Theme, Typography, colors } from "@mui/material"

import LockIcon from '@mui/icons-material/Lock';
import { useRef, useState } from "react";
 
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { SignUp } from "../../api/auth/SignUp";

type Props = {}

function SignUp_Page({}: Props) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const Box_sx: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "10vh"
  }
  const Container_sx: SxProps<Theme> = {
    display: 'flex',
    flexDirection: "column",
    padding: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center'

  }
  const Paper_sx: SxProps<Theme> = {
    display: 'flex',
    flexDirection: "column",
    padding: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
    gap: "3rem"
  }
  const  handle_SignUp =async  () => {
    const email :string    = emailRef.current!.value;
    const password :string = passwordRef.current!.value;
    console.log(emailRef.current)
    if ((email===undefined )){ alert("Please enter your email address");return}
    if ((password===undefined )) {alert("Please enter your password");return}
    console.log(email,password)
    const resp = await SignUp({email,password});
    //success, save token to session 
    if(resp.statusText==='Created'){
        const {access_token , refresh_token} = resp.data; 
      //  console.log(access_token, refresh_token)
      console.log(access_token , refresh_token)
        Cookies.set('access_token',access_token , {expires:0.0416}); //1 == 1 day
        Cookies.set('refresh_token',refresh_token, {expires:7});
  
        navigate('/')
    }
    else { alert(resp)
      console.log(resp)}
  }
  
  return (
    <Box sx={Box_sx}>

      <Container sx={Container_sx}>
        <Paper elevation={5} sx={Paper_sx}>
          <Avatar sx={{ bgcolor: colors.pink[400], padding: '1rem' }}>
            <LockIcon />
          </Avatar>
          <Typography variant='h4' component={'p'} sx={{ fontWeight: "bold" ,padding:'0.5rem'}}>
           Sign Up to Chat with PDF!
          </Typography>

          <TextField type='email' inputRef={emailRef} label="Email" variant="outlined" fullWidth helperText="Incorrect entry." />
          <TextField inputRef={passwordRef} label="Password" variant="outlined" fullWidth defaultValue={""}/> 

          <Button sx={{ padding: '0.5rem' }} onClick={handle_SignUp} variant="contained">Submit</Button>
        </Paper>

      </Container>






    </Box>)
}
export default SignUp_Page
