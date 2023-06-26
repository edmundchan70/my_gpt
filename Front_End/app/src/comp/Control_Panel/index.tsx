
import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'
  
import { Button, Container, Paper, TextField } from '@mui/material';
 
type Props = {}
 

function Control_Panel({ }: Props) {
  const file_ref = useRef<HTMLInputElement|null>(null);
  const TEMPLATE_PROMPT =`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know. Current conversation: {{chat_history}}, Human: {{input}}`

  return (
    <>
    
    <Container >
                        <Paper elevation={3} className='p-5'>
                            <Container sx={{display:"flex",alignItems:"left" ,flexDirection:"column"}} >
                                 <b className=' p-3'>Language Module: GPT3.5_turbo</b>
                            </Container>
                        </Paper>
                        <Paper elevation={3} className='p-3'>
                            <Container sx={{display:"flex",alignItems:"left" ,flexDirection:"column"}} >
                                 <b className=' p-3'>2.Character setting</b>
                                 <TextField    sx={{overflow:"auto" }} id="outlined-basic" label="Character Setting" variant="outlined" rows={3} multiline/>
                            </Container>
                            <Container  sx={{ display: "flex", justifyContent: "flex-end",padding:"1rem"}} >
                               <Button variant="contained">Create Character!</Button>
                            </Container>
                        </Paper>
    </Container>
    
    </>
  )
}

export default Control_Panel