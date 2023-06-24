
import { Box, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Message } from '../DTO/Message.dto';
import AttachFileIcon from '@mui/icons-material/AttachFile';

type Props = {

}
function Message_container({ }: Props) {
  const inputMessage = useRef<HTMLInputElement | null>(null);
  
  const [Dialog, setDialog] = useState<Message[]>([{
    role: 'ai', 
    msg: "HI! This is AI"
  },
  {
    role: 'human',
    msg: "HI! This is human"
  }]);
  const handle_input_msg = () => {
    if (!inputMessage.current?.value)
      alert("PLEASE ENTER SOMETHING!")
    const human_msg: Message = {
      role: "human",
      msg: inputMessage.current!.value
    }
    console.log(human_msg)
    setDialog((prev) => [...prev, human_msg]);
    inputMessage.current!.value=""
  }
  
   
  
  return (
    <>
      <Paper elevation={3}>
        <Box sx={{ display: "flex-inline" , }}>

          <Typography variant="h6" color="inherit" component="div">
            PDF_CHAT
          </Typography>
          <Box sx={{ height: "80vh" , overflow:"auto"}}>
            {Dialog.map((item, i) => {
              return (

                <Container   sx={item.role === "ai" ? {justifyContent:"flex-end", textAlign: "left" ,padding:"1rem"} : {  width:"fit-content",marginRight:"10px",padding:"1rem"} }>
                   {item.msg}

                
                </Container>)


            })}
          </Box>
          <Box sx={{ display: "flex", width: "100%", alignItems: "center" }} >
              
            
            <TextField id="outlined-basic" inputRef={inputMessage} label="Your Message" variant="outlined" fullWidth />
           
          </Box>
        </Box>



      </Paper>
    </>
  )
}

export default Message_container