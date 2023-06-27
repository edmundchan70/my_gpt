import { Container, Grid, Slide, Slider, Stack, InputLabel, TextField, Divider, Box, filledInputClasses, Button, Collapse } from "@mui/material"
import ReactJson from 'react-json-view'
 
import { useContext, useState } from "react"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Text_Chunk } from "../DTO/Text_Chunk";
import { Doc_config } from "../Playground";
import { Chat_config } from "../DTO/Chat_config";
import { create_text_chunk } from "../../api/text_chunk";
type Props = {
 
}
function Chat_info({   }: Props) {
  const default_grid_item_sx = [{ textAlign: "center", display: 'felx', flexDirection: "column" }]
  const [show_text_chunk, set_show_text_chunk] = useState<boolean>(false);
  const [show_system, set_show_system] = useState<boolean>(false);
  const [show_sim_search, set_show_sim_search] = useState<boolean>(false);
  const {chat_config,set_chat_config}   = useContext(Doc_config);
 
  const generate_text_chunk = async ()=>{
    const {chunkSize , chunkOverlap,rawData}=  chat_config;
    const create_text_chunk_DTO  : Chat_config= {
      chunkSize: chunkSize,
      chunkOverlap: chunkOverlap,
      rawData: rawData
    }
    console.log('create_text_chunk_DTO', create_text_chunk_DTO);
    const resp = await create_text_chunk(create_text_chunk_DTO);
    console.log(resp.data)
    set_chat_config((prev:Chat_config)=>({
        ...prev, text_chunk: resp.data
    }))
 
  }
 
  return (
    <>
      <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
        <Divider />
        <Grid item className="system_setting" sx={{ cursor: "pointer", padding: "1rem" }}>
          <Container onClick={() => set_show_system(!show_system)}>
            System setting {show_system ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </Container>
          <Collapse in={show_system}>
            <Grid item sx={default_grid_item_sx}>
              <InputLabel>Model: GPT-3.5-turbo</InputLabel>
            </Grid>
            <Grid item sx={default_grid_item_sx}  >
              Temperature
              <Divider />
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} justifyContent={"center"} alignItems="center">
                <InputLabel> More Strict</InputLabel>
                <Slider
                  size="small"
                  sx={{ width: "50%" }}
                  defaultValue={0}
                  min={0}
                  max={1}
                  step={0.1}
                  aria-label="Volume"
                  valueLabelDisplay="auto">
                </Slider>
                <InputLabel>More Creative</InputLabel>
              </Stack>

            </Grid>

            <Grid item sx={default_grid_item_sx}>
              System Message
              <Divider />
              <TextField
                placeholder="MultiLine with rows: 2 and rowsMax: 4"
                multiline
                fullWidth
                rows={5}
                maxRows={5}
              />
            </Grid>
          </Collapse>
        </Grid>
        <Divider />
        <Grid item className="text_chunk_setting" sx={{ cursor: "pointer" }} >
          <Container onClick={() => set_show_text_chunk(!show_text_chunk)}>
            Text Chunk Setting  {show_text_chunk ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </Container>
          <Collapse in={show_text_chunk}>
            <Grid item sx={default_grid_item_sx}>
              Text Chunk Setting
              <Box sx={{ padding: '1rem', gap: "1rem", display: "flex", flexDirection: "column" }} >
                <TextField
                  type="number"
                  id="outlined-number"
                  label="Chunk size(Token)"
                  variant="standard" 
                  onChange={e=>{
                         set_chat_config((prev : Chat_config)=>({
                          ...prev,  chunkSize:e.target.value
                        }))
                  }}>
                    
                </TextField>

                <TextField
                      type="number"
                      id="outlined-number"
                      label="Chunk Overlap(Token)"
                      variant="standard"
                      onChange={e=>{
                        set_chat_config((prev : Chat_config)=>({
                          ...prev,  chunkOverlap:e.target.value
                        }))
                  }}
                ></TextField>
                <Container  sx={{ display: "flex", justifyContent: "right" }}>
                  <Button onClick={generate_text_chunk} variant="contained" sx={{ width: "30%" }}>APPLY CHANGE!</Button>
                </Container>

              </Box>
            </Grid>

            <Grid item sx={default_grid_item_sx}>
              Text Chunk Result
              <Box sx={{ height: "30vh", overflow: "auto", textAlign: 'left', border: 1, display: "flex", flexDirection: "column", gap: "50px", padding: "1rem" }} >
             {chat_config?   <ReactJson src={chat_config.text_chunk!} collapsed /> : <>LOADING</>}
              </Box>
            </Grid>


          </Collapse>

        </Grid>
        <Divider />


        <Grid item className="similarity_search"  >

          <Container onClick={() => set_show_sim_search(!show_sim_search)} sx={{ cursor: "pointer" }}>
            Similarity Setting{show_sim_search ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </Container>
          <Collapse in={show_sim_search}>
             
            <Grid item >
            
              

              <Box sx={{ border:1, padding:'1.5rem', gap: "1rem", display: "flex", flexDirection: "column", alignItems: 'left' }}>
              Search Setting
                <Container sx={{display:'flex',flexDirection:"column" ,gap:'1rem'}}> 
                <TextField
                  sx={{ width: "50%" }}
                  type="text"
                  id="outlined-basic"
                  label="Number of Chunk return (k)"
                  variant="standard">
                </TextField>
                Response Time : second
                
                <Button variant="contained" sx={{ width: "30%" }}>Search!</Button>
            


                </Container>
               
              </Box>
              
            </Grid>

            <Grid item>
            
              <Box sx={{ height: "30vh", overflow: "auto", textAlign: 'left', border: 1, display: "flex", flexDirection: "column", gap: "50px", padding: "1rem" }} >
                Similarity Search Result:
                <Box sx={{display:'flex', flexDirection:'column'}}>
                     
                </Box>

            
              </Box>
            </Grid>



          </Collapse>

        </Grid>
        <Divider />







      </Grid>
    </>
  )
}

export default Chat_info