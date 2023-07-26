import { Avatar, Button, Container, Divider, Grid, List, ListItem, Paper, Theme, Typography, colors } from '@mui/material'
import React, {useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { SxProps } from "@mui/material"
import ListDocument from './ListDocument';
import { Document } from '../DTO/NavbarDto/Document.dto';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Chat_config } from '../DTO/PlaygroundDto/Chat_config';
import { upload_file } from '../../api/file/upload_file';
import PlayGround from '../Playground';
import { get_user_document_list } from '../../api/get_user_document/get_user_document';
type Props = {}
 
function Navbar({ }: Props) {

  const [chat_config, set_chat_config] = useState<Chat_config | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [selectDoc, setselectDoc] = useState<number>(0);
  // const [Document, setDocument] = useState<Document[]>([]);
  const [Document, setDocument] = useState<Document[]>([
  ]);
  //function
  const handleFileInputChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile)
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
    const { split_chunk, rawData, relevent_data } = resp.data;
    const init_chat_config: Chat_config = {
      chunkSize: relevent_data.chunkSize,
      chunkOverlap: relevent_data.chunkOVerlap,
      rawData: rawData,
      text_chunk: split_chunk,
      temperature: 0.8,
      File: selectedFile,
      system_msg: "Remeber the following data and use them to answer user question: "
    }
    set_chat_config(init_chat_config);
    await load_user_document()
  };
  const triggerUpload = () => {
    const target_element = document.getElementById('upload');
    console.log(target_element)
    target_element?.click();
  }
  const loadDocument = (DocId: number) => {
    console.log(DocId)
    setselectDoc(DocId);
  }
  const load_user_document = async()=>{
    const resp = await get_user_document_list();
    console.log('user document list load success')
    setDocument(resp.data)
}

  //const
  const AVATAR_SX: SxProps<Theme> = {
    width: '100px',
    height: '100px'
  }
  const ListItem_Sx: SxProps<Theme> = {
    justifyContent: 'center',
    textAlign: 'center',
    display: "flex",
    flexDirection: "column"
  }
  console.log(chat_config)
  console.log(Document)
  useEffect(()=>{
     
    load_user_document()
  },[])
  return (
    <>
 
        <Grid container sx={{gap:'0px'}}>
          <Grid item xs={2} >
            <Container sx={{marginTop:'20px'}} >
              <input id='upload' style={{ display: 'none' }} type='file' onChange={handleFileInputChange} />

              <List>

                <ListItem sx={ListItem_Sx}>
                  <Typography >
                    Normal  USER
                  </Typography>
                </ListItem>
                <ListItem sx={ListItem_Sx}>
                  <Avatar sx={AVATAR_SX}>
                    <PersonIcon />
                  </Avatar>
                </ListItem>
                <ListItem sx={ListItem_Sx}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Edmund Chan
                  </Typography>
                </ListItem>
                <Divider />


                <ListItem sx={{ display: 'flex', flexDirection: "column", overflow: "scroll", height: "67vh", gap: "10px" }}>

                  <Typography variant='h6'  >
                    File uploaded
                  </Typography>
                  <Divider />
                  <Button fullWidth variant='contained' sx={{ backgroundColor: colors.blue[500], padding: '1rem' }} onClick={triggerUpload}>
                    <AddCircleOutlineIcon />
                  </Button>
                  {Document.map((item, i) => {
                    if (item.doc_id === selectDoc)
                      return (<Button fullWidth onClick={() => { loadDocument(item.doc_id) }} sx={{ backgroundColor: colors.blue[400] }}>
                        <ListDocument data={item} />
                      </Button>)
                    else
                      return (<Button fullWidth onClick={() => { loadDocument(item.doc_id) }} sx={{
                        '&:hover': {
                          background: colors.blue[100]
                        }
                      }}>
                        <ListDocument data={item} />
                      </Button>)
                  })}

                </ListItem>

              </List>

            </Container>
      
          </Grid>
          <Grid item xs={10}>
          {chat_config&&  <PlayGround chat_config={chat_config!} />}
          </Grid>
        </Grid>




 



    </>

  )
}

export default Navbar