import React, { useRef } from 'react'
import { Button, Container, Paper, TextField, ThemeProvider } from "@mui/material"
import { darkTheme } from '../../util/mui_config/theme'
type Props = {}

function Create_Character({ }: Props) {
    const setting_ref = useRef<HTMLTextAreaElement| null>(null);

    return (
 
                <Container fixed>
                        <Paper elevation={3} className='p-5'>
                            <Container sx={{display:"flex",alignItems:"left" ,flexDirection:"column"}} >
                                 <b className=' p-3'>1. Character Name</b>
                                 <TextField id="outlined-basic" label="Character Name" variant="outlined" />
                            </Container>
                        </Paper>
                        <Paper elevation={3} className='p-3'>
                            <Container sx={{display:"flex",alignItems:"left" ,flexDirection:"column"}} >
                                 <b className=' p-3'>2.Character setting</b>
                                 <TextField inputRef={setting_ref}  sx={{overflow:"auto" }} id="outlined-basic" label="Character Setting" variant="outlined" rows={3} multiline/>
                            </Container>
                            <Container  sx={{ display: "flex", justifyContent: "flex-end",padding:"1rem"}} >
                               <Button  variant="contained">Create Character!</Button>
                            </Container>
                        </Paper>
                </Container>
        
    )
}

export default Create_Character