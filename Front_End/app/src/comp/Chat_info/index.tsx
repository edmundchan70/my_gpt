import { Container, Grid, Slide, Slider, Stack, InputLabel, TextField, Divider, Box, filledInputClasses, Button, Collapse } from "@mui/material"
import ReactJson from 'react-json-view'

import { useContext, useState } from "react"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Text_Chunk } from "../DTO/Text_Chunk";
import { Doc_config } from "../Playground";
import { Chat_config } from "../DTO/Chat_config";
import { create_text_chunk } from "../../api/text_chunk";
import { chunk_setting } from "../../api/DTO/chunk_setting.dto";
import similarity_search from "../../api/Similarity_Search/similarity_search";
import { chat_body } from "../../api/DTO/chat_body.dto";
type Props = {

}
function Chat_info({ }: Props) {
  const default_grid_item_sx = [{ textAlign: "center", display: 'felx', flexDirection: "column" }]
  const [show_text_chunk, set_show_text_chunk] = useState<boolean>(false);
  const [show_system, set_show_system] = useState<boolean>(false);
  const [show_sim_search, set_show_sim_search] = useState<boolean>(false);
  const { chat_config, set_chat_config } = useContext(Doc_config);

  async function generate_text_chunk() {
    const { chunkSize, chunkOverlap, rawData } = chat_config;
    const create_text_chunk_DTO: chunk_setting = {
      chunkSize: chunkSize,
      chunkOverlap: chunkOverlap,
      rawData: rawData
    }
    console.log('create_text_chunk_DTO', create_text_chunk_DTO);
    const resp = await create_text_chunk(create_text_chunk_DTO);
    console.log(resp.data)
    set_chat_config((prev: Chat_config) => ({
      ...prev, text_chunk: resp.data
    }))

  }
  async function update_similarity_search() {
    if  (!chat_config.similarity_query) alert("Please enter text to perfrm similarity search!");
    const similarity_search_DTO: chat_body = {
      text_chunk: chat_config.text_chunk,
      chunk_return: chat_config.k,
      query: chat_config.similarity_query
    }
    const resp = await similarity_search(similarity_search_DTO);
    set_chat_config((prev: Chat_config) => ({
      ...prev , 
      similarity_result: resp.data.text_chunk,
      similarity_Search_time: resp.data.vectorStore_search
    }))
    console.log(resp.data);
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
                  onChange={(e: any) => set_chat_config((prev: Chat_config) => ({ ...prev, temperature: e.target.value }))}
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
                onChange={e => set_chat_config((prev: Chat_config) => ({
                  ...prev, system_msg: e.target.value
                }))}
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
                  onChange={e => {
                    set_chat_config((prev: Chat_config) => ({
                      ...prev, chunkSize: e.target.value
                    }))
                  }}>

                </TextField>

                <TextField
                  type="number"
                  id="outlined-number"
                  label="Chunk Overlap(Token)"
                  variant="standard"
                  onChange={e => {
                    set_chat_config((prev: Chat_config) => ({
                      ...prev, chunkOverlap: e.target.value
                    }))
                  }}
                ></TextField>
                <Container sx={{ display: "flex", justifyContent: "right" }}>
                  <Button onClick={generate_text_chunk} variant="contained" sx={{ width: "30%" }}>APPLY CHANGE!</Button>
                </Container>

              </Box>
            </Grid>

            <Grid item sx={default_grid_item_sx}>
              Text Chunk Result
              <Box sx={{ height: "30vh", overflow: "auto", textAlign: 'left', border: 1, display: "flex", flexDirection: "column", gap: "50px", padding: "1rem" }} >
                {chat_config ? <ReactJson src={chat_config.text_chunk!} collapsed /> : <>LOADING</>}
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



              <Box sx={{ border: 1, padding: '1.5rem', gap: "1rem", display: "flex", flexDirection: "column", alignItems: 'left' }}>
                Search Setting
                <Container sx={{ display: 'flex', flexDirection: "column", gap: '1rem' }}>
                  <Box sx={{display:'flex' ,alignItems:'center',gap:'20px'}}>
                      Chunk return:
                    <TextField
                    sx={{ width: "50%" }}
                    type="number"
                    id="outlined-number"
                    label="Number of Chunk return (k)"
                    onChange={e => {
                      set_chat_config((prev: Chat_config) => ({
                        ...prev, k: e.target.value
                      }))
                    }}
                    variant="standard">
                  </TextField>
                  </Box>
                  
                  <Box sx={{display:'flex' ,alignItems:'center',gap:'35px'}}>
                   Query Text:
                      <TextField
                        label="Input Text to query data"
                        id="outlined-basic "
                        type='text'
                        variant="standard"
                        sx={{width: "50%" }}
                        onChange={e => set_chat_config((prev: Chat_config) => ({
                          ...prev, similarity_query: e.target.value
                        }))}
                        maxRows={5}
                      />  
                  </Box>



                  <Button variant="contained" sx={{ width: "30%" }} onClick={update_similarity_search}>Search!</Button>


                </Container>

              </Box>

            </Grid>

            <Grid item>

              <Box sx={{ height: "30vh", overflow: "auto", textAlign: 'left', border: 1, display: "flex", flexDirection: "column", gap: "50px", padding: "1rem" }} >
                Similarity Search Result:
                <Box  >
                      {chat_config? <ReactJson src={chat_config.similarity_result!} collapsed />: <>Loading</>}
                </Box>

                Response Time :  {chat_config? chat_config.similarity_Search_time : <>Loading</>}second
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