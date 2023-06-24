import React, { useEffect, useState } from 'react'
import PlayGround from '../../comp/Playground'
import { get_api_key } from '../../util/get_api_key'
import { useNavigate } from 'react-router-dom'
import Control_Panel from '../../comp/Control_Panel'
import { Container, Grid } from '@mui/material'
import Chat_info from '../../comp/Chat_info'
import { Document, Page } from 'react-pdf';


type Props = {}

function Home({ }: Props) {
 
  /*
  useEffect(() => {
    if (!get_api_key())
      nav('/Login');
  }, [])*/
  return (
    <>
      <Grid container spacing={2}>
        
        <Grid item xs={8}>
          <PlayGround />
        </Grid>
        <Grid item xs={4}>
          <Chat_info />
        </Grid>


      </Grid>

    </>



  )
}

export default Home