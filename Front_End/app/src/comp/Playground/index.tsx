import React, { useRef, useState } from 'react'
import Message_container from './Message_container'

import { Conversation } from '../Conversation/Conversation.class';

import { Box, Container, Grid, Paper } from '@mui/material';
import UploadImg from "./assets/Upload.png"
import Display_Pdf from './Display_Pdf';
import { upload_file } from '../../api/file/file';
type Props = {}

function PlayGround({ }: Props) {

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
    console.log(selectedFile);

    const resp = await setUploadFile(selectedFile);
    console.log(resp);
    upload_file(selectedFile);
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
      <Container sx={{ display: "flex" }}>
        {uploadFile ?
          <>
            <Grid item xs={6}>
              <Message_container />
            </Grid>
            <Grid item xs={6}>
              <Display_Pdf File={uploadFile} />
            </Grid>
          </>

          :
          <Grid item xs>
            <Box component={"img"} src={UploadImg} sx={box_style} onClick={triggerUpload}>
            </Box>
            <input id='upload' style={{ display: 'none' }} type='file' onChange={handleFileInputChange} />


          </Grid>}

      </Container>



    </>



  )
}

export default PlayGround