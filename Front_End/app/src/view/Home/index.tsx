import React, { useEffect, useState } from 'react'
import PlayGround from '../../comp/Playground'
import { get_api_key } from '../../util/get_api_key'
import { useNavigate } from 'react-router-dom'
import Control_Panel from '../../comp/Control_Panel'
import { Container, Grid } from '@mui/material'
import Chat_info from '../../comp/Chat_info'
import { Document, Page } from 'react-pdf';
import Header from '../../comp/Header'


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
          <PlayGround />
    
       


 
    </>



  )
}

export default Home