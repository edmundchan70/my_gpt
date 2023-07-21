import React from 'react'
import { Avatar, Box, Button, Container, FormControl, Grid, Paper, SxProps, TextField, Theme, Typography, colors } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
type Props = {}

function LoginForm({}: Props) {
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
        alignItems:'center',
    
      }
     const Paper_sx :SxProps<Theme>={
        display:'flex',
        flexDirection:"column",
        padding:'5rem',
        justifyContent:'center',
        alignItems:'center',
             gap:"3rem"
     }
  return (
    <Box sx={Box_sx}>
            
                  <Container sx={Container_sx}>
                    <Paper elevation={5} sx={Paper_sx}>
                            <Avatar sx={{bgcolor:colors.pink[400],padding:'1rem'}}>
                            <LockIcon  />
                          </Avatar>
                          <Typography variant='h4' component={'p'} sx={{fontWeight:"bold"}}>
                            LOGIN TO YOU ACCOUNT
                          </Typography>
                           
                            <TextField   label="Email" variant="outlined" fullWidth/>              
                            <TextField   label="Password" variant="outlined" fullWidth/> 
                          
                          <Button sx={{padding:'0.5rem'}} variant="contained">Submit</Button>
                    </Paper>

                  </Container>
                  
                      
                   
             
           

        </Box>
  )
}

export default LoginForm