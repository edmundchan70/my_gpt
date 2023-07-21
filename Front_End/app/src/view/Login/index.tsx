import { Avatar, Box, Button, Container, FormControl, Grid, Paper, SxProps, TextField, Theme, colors } from "@mui/material"

import LockIcon from '@mui/icons-material/Lock';
import { useRef } from "react";

type Props = {}

function Login({}: Props) {
  const Box_sx : SxProps<Theme> ={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:"10vh"
  }
  const Container_sx : SxProps<Theme> ={
    display:'flex',
    flexDirection:"column",
    padding:'2rem',
    justifyContent:'center',
    alignItems:'center'
  }
  const Paper_sx : SxProps<Theme> ={
    width:"30%",
    height:"500px"
  }
  const emailRef = useRef<HTMLInputElement |null>(null);
  const passwordRef = useRef<HTMLInputElement |null>(null);

      return(
      <>
        <Box sx={Box_sx}>
              <Paper elevation={3} sx={Paper_sx}>
                  <Container sx={Container_sx}>
                          <Avatar sx={{bgcolor:colors.pink[400],padding:'1rem'}}>
                            <LockIcon  />
                          </Avatar>
                          <FormControl>
                            <TextField   label="Email" variant="outlined" />              
                            <TextField   label="Password" variant="outlined" /> 
                          </FormControl>
                          <Button fullWidth variant="contained">Submit</Button>
                  </Container>
                  
                      
                   
             
              </Paper>

        </Box>
      </>
    )
 
}

export default Login