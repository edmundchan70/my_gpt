
import {  Avatar, Box, Container, Fab, Grid, Paper, SxProps, TextField, Toolbar, Typography } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { Message } from '../DTO/PlaygroundDto/Message.dto';
import { chat } from '../../api/chat/chat';
import { chat_body } from '../../api/chat/DTO/chat_body.dto';
import { Chat_config } from '../DTO/PlaygroundDto/Chat_config';
import { Theme } from '@emotion/react';
import { get_summary } from '../../api/chat/get_summary';
import { Document_id } from '../../api/chat/DTO/Document_id.dto';
import { retrieve_conversation } from '../../api/chat/retreive_conversation';
import { conversation } from '../../api/chat/DTO/conversation.dto';
import { AxiosResponse } from 'axios';
 
 
type Props = {
  doc_id : string
}

function Message_container({ doc_id }: Props) {
  const inputMessage = useRef<HTMLInputElement | null>(null);
 
  console.log('chat_config: ',doc_id)
  const [Dialog, setDialog] = useState<Message[]>([]);

  const handle_input_msg = async() => {
    if (!inputMessage.current?.value) alert("PLEASE ENTER SOMETHING!")
    //handle user input , update dialog
    const input_msg = inputMessage.current!.value
    const human_msg : Message= {
      role: "HUMAN",
      msg:  input_msg
    } 
    setDialog((prev) => [...prev!, human_msg]);
    inputMessage.current!.value=""
    const chat_body : chat_body = {
      doc_id:doc_id,
      query: input_msg
    }
    //send user respond to openAI with corresponding data 
    const resp  = await chat(chat_body);  
 
    const AI_msg :Message ={
      role:"AI",
      msg: resp.data.msg
    }
   
    
    setDialog((prev) => [...prev!, AI_msg]);
  }
 
  const get_conversation= async (doc_id:string)=>{
    const resp : AxiosResponse<conversation[]>= await retrieve_conversation({doc_id: doc_id})
 
    resp.data.map(({MessageTime,Message,role}:conversation,i)=>{
      console.log(Message,role)
      const msg : Message= {
        role: role,
        msg:  Message
      }
      
      setDialog((prev?)=> [...prev,msg])
   

    })
  }
  const container_AI  :SxProps<Theme>  =  {
 
    marginLeft:'10px', 
    borderRadius:"1rem",
    textAlign: "left",
    width:"fit-content" ,
    padding:"2rem",
    display:"flex",
    gap:"10px"
  }
  const container_human :SxProps<Theme> ={
    maxHeight:"150px" ,
    borderRadius:"1rem",
    width:"fit-content",
    marginRight:"10px",
    padding:"2rem",
    display:"flex",
    gap:"10px"} 
  useEffect(()=>{
   // summarize_documnet();
   if(doc_id) {
    setDialog([])
    get_conversation(doc_id);
   }
  },[doc_id])
 
  
  return (
    <>
       
       
        <Paper elevation={5} sx={{width:'80%',marginTop:'30px',backgroundColor:'rgba(0,0,0, 0.1)'}} >
        

          
          <Box sx={{ height: "80vh", overflow:"scroll"}}>
          
           
            {Dialog&&Dialog.map((item :any) => {
              return (

                <Container  sx={item.role === "AI" ? container_AI:
                                                    container_human}>
              {item.role === "AI"&& 
                    <Avatar sx={{margin:"auto"}}>
                    <SmartToyIcon />
                </Avatar>}
                <Container sx={{overflow:'scroll' ,display:"flex",backgroundColor:'white',borderRadius:"30px",padding:'1rem'}}>  
              
            
                    <Typography sx={{fontSize:'14px'}}> {item.msg}</Typography>
                    
                </Container>
                {item.role !== "AI"&& 
                    <Avatar sx={{margin:"auto"}}>
                    <PersonIcon />
                </Avatar>}

                
                </Container>)


            })}
          </Box>
          <Grid container sx={{ display: "flex", width: "100%", alignItems: "center" ,padding:"1rem"}} >
              
            <Grid item xs={11}>
            <TextField id="outlined-basic" inputRef={inputMessage} label="Your Message" variant="outlined" fullWidth />
            </Grid>
 
            <Grid item xs={1}>
            <Fab color="primary" onClick={handle_input_msg} aria-label="add"><SendIcon /></Fab>
            </Grid>
           
          </Grid>
          </Paper>
 



     
    </>
  )
}

export default Message_container