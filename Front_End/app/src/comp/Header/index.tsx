import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

type Props = {}

function Header({}: Props) {
  return (
<AppBar position="static">
  <Toolbar variant="dense">
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      
    </IconButton>
    <Typography variant="h6" color="inherit" component="div">
      Chat PDF
    </Typography>
  </Toolbar>
</AppBar>
  )
}

export default Header