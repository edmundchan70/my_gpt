'use client';
// @refresh
import React from 'react'
import login_logo from "../../../public/login_logo.png"
import {LockOutlined, Padding} from "@mui/icons-material"
import {Avatar, Button, Grid, Paper, TextField }from "@mui/material"
import { createTheme } from '@mui/material/styles';

type Props = {}

function page (Props: Props){
  const paper_style = {padding: 20 ,height: "70vh" ,width: 280,margin: "20px auto"}
  const avatar_style ={backgroundColor:"black"}
  const button_style={backgroundColor:"#2196f3"}
  const grid_style ={display:"flex" ,justifyContent: "center"}
 
  return  (
    <>
     <Grid>
      <Paper elevation={10} style={paper_style}>
        <Grid style={grid_style} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}  >
          <Avatar style={avatar_style}><LockOutlined /></Avatar>
          <h2>Sign In</h2>
          <TextField label="email" placeholder='enter your email address!' fullWidth required  variant="standard" />
          <TextField label="password" placeholder='enter your pwd!' fullWidth required  variant="standard" />
          <Grid display={'flex'} flexDirection={'column'} gap={"10px"} paddingTop={"1rem"}>
          <Button type='submit'  size='medium' variant='contained'  style={button_style} fullWidth >SIGN IN!</Button>
          <Button type='submit'  size='medium' variant='outlined'   fullWidth>SIGN Up!</Button>
          </Grid>
 
        </Grid>
      </Paper>  
     </Grid>
    
    </>
  )
}

export default page