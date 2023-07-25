import React, { useRef, useState,createContext, Context, useEffect } from 'react'
import Message_container from './Message_container'
import CardHeader from '@mui/material/CardHeader';
import { Box, Button, Container, Divider, Grid, Paper } from '@mui/material';
import UploadImg from "./assets/Upload.png"
import Test_pdf from "./assets/CoverLEtter.pdf";
import { upload_file } from '../../api/file/upload_file';

 
 

import { Chat_config } from '../DTO/PlaygroundDto/Chat_config';
import Display_Pdf from './Display_Pdf';
import Cookies from 'js-cookie';
 
 
 
type Props = {
  chat_config: Chat_config
}
 
function PlayGround({ chat_config}: Props) {
  return (
    <> 
    
 
      
            {console.log('cgat _congif',chat_config)}
              <Container  sx={{display: 'flex',justifyContent:"center",gap:"40px"}}>
                  <Message_container  chat_config={chat_config} />
                  <Display_Pdf File={chat_config.File!} />
              </Container>
    
         
 

      </>
  )
}

export default PlayGround