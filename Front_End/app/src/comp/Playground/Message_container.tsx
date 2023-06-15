
import { Box, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
type Props = {

}
function Message_container({ }: Props) {
  const inputMessage = useRef<HTMLInputElement | null>(null);
  const handle_input = () => {
    console.log(inputMessage.current!.value);
  }
  return (
    <>
      <Paper elevation={3}>
        <Grid container rowSpacing={1}>
          <Box sx={{ display: 'inline-flex' }}>
            <Typography variant="h6" color="inherit" component="div">
              PDF_CHAT
            </Typography>
          </Box>
        </Grid>
        <Grid container rowSpacing={5}>
          <Chat />
          <Box sx={{ display: "flex", width: "100%", alignItems: "center" }} >
            <TextField id="outlined-basic" inputRef={inputMessage} label="Your Message" variant="outlined" fullWidth />
            <SendIcon fontSize='large' />
          </Box>

        </Grid>

      </Paper>
    </>
  )
}

export default Message_container