import React, { useEffect, useState } from 'react'
import PlayGround from '../../comp/Playground'
import { get_api_key } from '../../util/get_api_key'
import { useNavigate } from 'react-router-dom'
import Control_Panel from '../../comp/Control_Panel'
import { Container, Grid, SxProps } from '@mui/material'
import Chat_info from '../../comp/Chat_info'
import { Document, Page } from 'react-pdf';
import Header from '../../comp/Header'
import Navbar from '../../comp/Navbar'
import { Theme } from '@emotion/react'


type Props = {}

function Home({ }: Props) {
 
  /*
  useEffect(() => {
    if (!get_api_key())
      nav('/Login');
  }, [])*/
  //
  return (
    <>
      <Header />
      <Grid container  >
        <Grid item xs={2} >
           <Navbar />
        </Grid>
       
        <Grid item xs={9} >
         <PlayGround />
        </Grid>
            
      </Grid>
         
    
       


 
    </>



  )
}

export default Home