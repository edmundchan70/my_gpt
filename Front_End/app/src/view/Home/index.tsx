import React, { useEffect, useState } from 'react'
import PlayGround from '../../comp/Playground'
 
import { useNavigate } from 'react-router-dom'
import Control_Panel from '../../comp/Control_Panel'
import { Container, Grid, SxProps } from '@mui/material'
 
import { Document, Page } from 'react-pdf';
import Header from '../../comp/Header'
import Navbar from '../../comp/Navbar'
import { Theme } from '@emotion/react'
import { getAccessToken } from '../../util/getToken/getToken'


type Props = {}

function Home({ }: Props) {
 const nav = useNavigate()
 
  useEffect(() => {
    if (!getAccessToken())
      nav('/Login');
  }, [])
 
  return (
    <>
      <Header />
     
           <Navbar />
     
       
 
         
    
       


 
    </>



  )
}

export default Home