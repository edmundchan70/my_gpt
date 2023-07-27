import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from '@mui/material'
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
  <Toolbar variant="dense" sx={{display:'flex',justifyContent:"space-between"}}>
  
    <Typography variant="h6" color="inherit" component="div">
      Chat PDF
    </Typography>
    <Button variant='contained' onClick={logout} sx={{backgroundColor:"white"}}>
      <ExitToAppIcon sx={{color:"darkblue"}}/>
    </Button>
  </Toolbar>
</AppBar>
  )
}

export default Header