
import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'
import PlayGround from '../Playground';
import { Config } from '../DTO/Config.dto';
import { OpenAI } from "langchain/llms/openai"
import { BaseMemory, BufferMemory, ConversationSummaryMemory } from 'langchain/memory';
import { BasePromptTemplate, PromptTemplate } from 'langchain/prompts';
import { BaseOutputParser } from 'langchain/dist/schema/output_parser';
import { StructuredOutputParser } from 'langchain/output_parsers';
 
import { BaseLanguageModel } from 'langchain/dist/base_language';
import { Conversation } from '../Conversation/Conversation.class';
import { Document } from 'langchain/dist/document';
import { Button, Container, Paper, TextField } from '@mui/material';
 
type Props = {}
function construct_prompt(raw_prompt:string,parser : string) : PromptTemplate{
  return  new PromptTemplate({template:raw_prompt,inputVariables:["input"],partialVariables:{format_instructions: parser}})
}
function construct_parser(raw_parser:string) :string{
  // parser.getFormatInstructions()  is the default output_parser
  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    answer: "answer to the user's question",
    source: "source used to answer the user's question, should be a website.",
  });
  return raw_parser===""?  parser.getFormatInstructions() : raw_parser
}
function construct_model(temp:number, api_key:string , verbose:boolean,model_name:string):BaseLanguageModel{
  return  new OpenAI({temperature: temp , openAIApiKey: api_key,verbose:verbose,modelName:model_name})
}

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