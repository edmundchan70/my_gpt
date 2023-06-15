import React, { useEffect, useState } from 'react'
import PlayGround from '../../comp/Playground'
import { get_api_key } from '../../util/get_api_key'
import { useNavigate } from 'react-router-dom'
import Control_Panel from '../../comp/Control_Panel'
import { Container, Grid } from '@mui/material'
import Chat_info from '../../comp/Chat_info'


type Props = {}

function Home({ }: Props) {
  const nav = useNavigate();
  useEffect(() => {
    if (!get_api_key())
      nav('/Login');
  }, [])
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Control_Panel />
        </Grid>
        <Grid item xs={6}>
          <PlayGround />
        </Grid>
        <Grid item xs={3}>
          <Chat_info />
        </Grid>


      </Grid>

    </>



  )
}

export default Home