import React, { useEffect, useRef } from 'react'
import { Avatar, Box, Button, Container, FormControl, Grid, Paper, SxProps, TextField, Theme, Typography, colors } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import { Signin } from '../../api/auth/SignIn';
import { useCookies } from 'react-cookie';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../util/getToken/getToken';
type Props = {}

function LoginForm({ }: Props) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate()
 
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

  }
  const Paper_sx: SxProps<Theme> = {
    display: 'flex',
    flexDirection: "column",
    padding: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
    gap: "3rem"
  }
  const  handle_Login =async  () => {
    const email :string    = emailRef.current!.value;
    const password :string = passwordRef.current!.value;
    console.log(emailRef.current)
    if ((email===undefined )){ alert("Please enter your email address");return}
    if ((password===undefined )) {alert("Please enter your password");return}
    const resp = await Signin({email,password});
    //success, save token to session 
    if(resp.status===200){
        const {access_token , refresh_token} = resp.data; 
        console.log(access_token, refresh_token)
        Cookies.set('access_token',access_token , {expires:0.0104 }); //1 == 1 day
        Cookies.set('refresh_token',refresh_token, {expires:7});
       
        navigate('/')
    }else {
     console.log(resp)
    
      alert(resp)}
  }
  useEffect(()=>{
    if(getAccessToken())
      navigate('/')
  },[])
  return (
    <Box sx={Box_sx}>

      <Container sx={Container_sx}>
        <Paper elevation={5} sx={Paper_sx}>
          <Avatar sx={{ bgcolor: colors.pink[400], padding: '1rem' }}>
            <LockIcon />
          </Avatar>
          <Typography variant='h4' component={'p'} sx={{ fontWeight: "bold" }}>
            LOGIN TO YOU ACCOUNT
          </Typography>

          <TextField type='email' inputRef={emailRef} label="Email" variant="outlined" fullWidth helperText="Incorrect entry." />
          <TextField type="password" inputRef={passwordRef} label="Password" variant="outlined" fullWidth defaultValue={""}/> 

          <Button sx={{ padding: '0.5rem' }} onClick={handle_Login} variant="contained">Submit</Button>
        </Paper>

      </Container>






    </Box>
  )
}

export default LoginForm