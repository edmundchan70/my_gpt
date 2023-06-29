import React, { useRef, useState,createContext, Context, useEffect } from 'react'
import Message_container from './Message_container'
import CardHeader from '@mui/material/CardHeader';
import { Box, Button, Container, Divider, Grid, Paper } from '@mui/material';
import UploadImg from "./assets/Upload.png"
 
import { upload_file } from '../../api/file/upload_file';

 
 
 
import { Chat_config } from '../DTO/Chat_config';
import Display_Pdf from './Display_Pdf';
 
 
 
type Props = {}
export  const Doc_config = createContext< any>(null);
function PlayGround({ }: Props) {
  const [chat_config,set_chat_config] = useState<Chat_config | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

    
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
    const {split_chunk,rawData, relevent_data} = resp.data;
    
    const init_chat_config :Chat_config= {
        chunkSize: relevent_data.chunkSize,
        chunkOverlap:relevent_data.chunkOVerlap,
        rawData:rawData,
        text_chunk: split_chunk,
        temperature :0.8,
        File: uploadFile!,
        system_msg: "Remeber the following data and use them to answer user question: "
    }
    set_chat_config(init_chat_config);
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
 
  return (
    <>
      <Doc_config.Provider value={{chat_config ,set_chat_config}}>
      {uploadFile ?
        <>
            {console.log('cgat _congif',chat_config)}
          <Grid container spacing={2}>
            <Grid item xs={8}>
   
              <Container  sx={{display: 'flex'}}>
                  <Message_container  />
                  <Display_Pdf File={uploadFile!} />
              </Container>
            </Grid>
            
         
           
            <Grid item xs={4}>
        
          
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