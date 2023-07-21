import { Avatar, Box, Button, Container, FormControl, Grid, Grow, Paper, SxProps, TextField, Theme, Typography, colors } from "@mui/material"

import LockIcon from '@mui/icons-material/Lock';
import { useRef } from "react";
import LoginForm from "./LoginForm";

type Props = {}

function Login({ }: Props) {

  const Container_sx: SxProps<Theme> = {
    height: '100vh',
    width: '100%',
    backgroundColor: colors.blue[300],
    textAlign: "center",

  }
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Grid container padding={0} >
        <Grid item xs={8}>
          <LoginForm />
        </Grid>

        <Grid item xs={4}>
          <Box display="flex"
          flexDirection={'column'}
            justifyContent="center"
            alignItems="center"
            sx={Container_sx}>

            <Typography variant='h4' component={'p'} sx={{ fontWeight: "bold", color: 'white', alignItems: 'center' ,padding:'2rem'}}>
              New Here?
            </Typography>
           
            <Typography   component={'p'} sx={{ color:'white',  alignItems: 'center',fontSize:"20px"  ,padding:'3rem'}}>
           Sign Up   and start chatting with your documents!
            </Typography>
            <Button variant="outlined"  sx={{backgroundColor:"white", }}>
                Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>

    </>
  )

}

export default Login