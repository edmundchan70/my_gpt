
import { AppBar, Box, Container, Fab, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
  
 
import { Message } from '../DTO/Message.dto';
import { chat } from '../../api/chat/chat';
import { chat_body } from '../../api/DTO/chat_body.dto';
import { Text_Chunk } from '../DTO/Text_Chunk';
import { Doc_config } from '.';
import { type } from 'os';
import App from '../../App';
import { lightTheme } from '../../util/mui_config/theme';
 
type Props ={}
function Message_container({  }: Props) {
  const inputMessage = useRef<HTMLInputElement | null>(null);
  const {chat_config,set_chat_config}  = useContext(Doc_config)
  console.log('chat_config: ',chat_config)
  const [Dialog, setDialog] = useState<Message[]>([{
    role: 'ai', 
    msg: "HI! This is AI"
  },
  {
    role: 'human',
    msg: "HI! This is human"
  }]);
  const handle_input_msg = async() => {
    if (!inputMessage.current?.value) alert("PLEASE ENTER SOMETHING!")

    //handle user input , update dialog
    const human_msg : Message= {
      role: "human",
      msg: inputMessage.current!.value
    } 
    setDialog((prev) => [...prev, human_msg]);
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
 
    
    setDialog((prev) => [...prev, AI_msg]);
  }
  
 
  
  return (
    <>
       
       
        <Paper elevation={1} sx={{width:'60%'}} >
        

          
          <Box sx={{ height: "80vh" , overflow:"auto"}}>
          
            <Box sx={{width:"inherit",background:lightTheme.palette.primary.light}}  >
                <Typography variant="h6" color="inherit" component="div">
                    PDF_CHAT
                  </Typography>
            </Box>
              
      
            {Dialog.map((item :any) => {
              return (

                <Container  sx={item.role === "ai" ? { marginLeft:'10px', borderRadius:"1rem",textAlign: "left",width:"fit-content" ,padding:"0.25rem"} :
                                                     {  borderRadius:"1rem",width:"fit-content",marginRight:"10px",padding:"0.25rem",backgroundColor:lightTheme.palette.primary.main} }>
              {item.msg} 

                
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