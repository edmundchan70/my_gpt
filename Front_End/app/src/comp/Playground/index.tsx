import React, { useRef, useState,createContext, Context, useEffect } from 'react'
import Message_container from './Message_container'
import CardHeader from '@mui/material/CardHeader';
import { Box, Button, Container, Divider, Grid, Paper } from '@mui/material';
 
import Display_Pdf from './Display_Pdf';
 
 
type Props = {
  doc_id : string,
  File: File | Uint8Array
}
 
function PlayGround({ doc_id ,File}: Props) {
  return (
    <> 
    
 
      
            {console.log('cgat _congif')}
              <Container  sx={{display: 'flex',justifyContent:"center",gap:"40px"}}>
                  <Message_container  doc_id={doc_id} />
                  <Display_Pdf File={File} />
              </Container>
    
         
 

      </>
  )
}

export default PlayGround