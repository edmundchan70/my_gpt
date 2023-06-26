import React, { useRef, useState,createContext, Context } from 'react'
import Message_container from './Message_container'

import { Box, Button, Container, Divider, Grid, Paper } from '@mui/material';
import UploadImg from "./assets/Upload.png"
import Display_Pdf from './Display_Pdf';
import { upload_file } from '../../api/file/upload_file';

import Chat_info from '../Chat_info';
import { Text_Chunk } from '../DTO/Text_Chunk';
import { chat_body } from '../../api/DTO/chat.dto';
import { Chat_config } from '../DTO/Chat_config';
import { chat } from '../../api/chat/chat';
 
 
type Props = {}
export  const Doc_config = createContext< any>(null);
function PlayGround({ }: Props) {
  const [chat_config,set_chat_config] = useState<Chat_config | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [text_chunk, set_text_chunk] = useState<Text_Chunk[] | null>(null);
  const handleFileInputChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = e.target.result;
        setUploadFile(data);
      };

      reader.readAsArrayBuffer(selectedFile);
    }


    setUploadFile(selectedFile);
    const resp = await upload_file(selectedFile);
    console.log(resp.data)
    set_text_chunk(resp.data.split_chunk)
  };
  const triggerUpload = () => {

    const target_element = document.getElementById('upload');
    console.log(target_element)
    target_element?.click();
  }

  const box_style = {
    height: 233,
    width: 350,
    maxHeight: { xs: 233, md: 167 },
    maxWidth: { xs: 350, md: 250 },
    margin: "auto",
    marginTop: "30vh",
    cursor: "pointer"
  }
  console.log(text_chunk)
  return (
    <>
      <Doc_config.Provider value={{chat_config ,set_chat_config}}>
      {uploadFile ?
        <>
            {console.log('cgat _congif',chat_config)}
          <Grid container spacing={2}>
            <Grid item xs={8}>
   
              <Container  sx={{display: 'flex'}}>
                  <Message_container  text_chunk={text_chunk}/>
              </Container>
            </Grid>
            
         
           
            <Grid item xs={4}>
        
              <Chat_info text_chunk={text_chunk}  File={uploadFile}/>
            </Grid>
          </Grid>




   


    </>

          :
  <Grid item xs>
    <Box component={"img"} src={UploadImg} sx={box_style} onClick={triggerUpload}>
    </Box>
    <input id='upload' style={{ display: 'none' }} type='file' onChange={handleFileInputChange} />


  </Grid>
}


</Doc_config.Provider>
      </>
  )
}

export default PlayGround