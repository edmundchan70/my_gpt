import { AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Typography, colors } from '@mui/material'
import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
type Props = {}

function Header({}: Props) {
  const nav = useNavigate();
  const logout = ()=>{
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    nav("/login")
  }
  return (
<AppBar position="static">
  
  <Toolbar variant="dense" sx={{display:'flex',justifyContent:'space-between'}} >
      <Typography variant="h6" color="inherit" component="div">
          Chat PDF
      </Typography>
    <Box>
      <Button variant='outlined' sx={{color:"white","&:hover":{bgcolor:"white",color:colors.blue[600]}}}> 
        DashBoard
      </Button>
   
      <Button variant='outlined' onClick={logout}   sx={{color:"white" ,"&:hover":{bgcolor:"white",color:colors.blue[600]}}}>
      <ExitToAppIcon/>
    </Button>
    </Box>
  
  
  </Toolbar>
</AppBar>
  )
}

export default Header