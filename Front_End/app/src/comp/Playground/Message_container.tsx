
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
 
 
 
 
type Props ={
  chat_config: Chat_config
}
function Message_container({ chat_config }: Props) {
  const inputMessage = useRef<HTMLInputElement | null>(null);
 
  console.log('chat_config: ',chat_config)
  const [Dialog, setDialog] = useState<Message[]|null>(null);

  const handle_input_msg = async() => {
    if (!inputMessage.current?.value) alert("PLEASE ENTER SOMETHING!")

    //handle user input , update dialog
    const human_msg : Message= {
      role: "human",
      msg: inputMessage.current!.value
    } 
    setDialog((prev) => [...prev!, human_msg]);
    inputMessage.current!.value=""
    const chat_body :chat_body = {
        text_chunk: chat_config.text_chunk!,
        query: human_msg.msg
    }
    //send user respond to openAI with corresponding data 
    const resp  = await chat(chat_body);  
    console.log(resp)
    const AI_msg :Message ={
      role:"ai",
      msg: resp.data.msg.text
    }
    console.log(resp.data);
 
    
    setDialog((prev) => [...prev!, AI_msg]);
  }
  const summarize_documnet = async ()=>{
    const SUMMARY_QUERY = 'GIVE ME THE SUMMARY OF THE DOCUMENT'
    const resp  = await chat(  { 
      text_chunk: chat_config.text_chunk!,
      query: SUMMARY_QUERY
    });  
    const AI_msg :Message ={
      role:"ai",
      msg: resp.data.msg.text
    }
    console.log(resp, 'sumarize');
    setDialog(() =>  [AI_msg]);
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
    if(chat_config) summarize_documnet();
  },[chat_config])
 
  
  return (
    <>
       
       
        <Paper elevation={5} sx={{width:'80%',marginTop:'30px',backgroundColor:'rgba(0,0,0, 0.1)'}} >
        

          
          <Box sx={{ height: "80vh", overflow:"scroll"}}>
          
           
            {Dialog&&Dialog.map((item :any) => {
              return (

                <Container  sx={item.role === "ai" ? container_AI:
                                                    container_human}>
              {item.role ==="ai"&& 
                    <Avatar sx={{margin:"auto"}}>
                    <SmartToyIcon />
                </Avatar>}
                <Container sx={{overflow:'scroll' ,display:"flex",backgroundColor:'white',borderRadius:"30px",padding:'1rem'}}>  
              
            
                    <Typography sx={{fontSize:'14px'}}> {item.msg}</Typography>
                    
                </Container>
                {item.role !=="ai"&& 
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