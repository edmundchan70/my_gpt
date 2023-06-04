import { Console } from 'console';
import React, { memo, useEffect, useRef, useState } from 'react'
import PlayGround from '../Playground';
import { Config } from '../DTO/Config.dto';
import { OpenAI } from "langchain/llms/openai"
import { BufferMemory, ConversationSummaryMemory } from 'langchain/memory';
type Props = {}
 
function Control_Panel({ }: Props) {
  const [config, set_config] = useState<Config | null>(null);
  const [temp,set_temp] =   useState<number >(0.0);
  const [parser, set_parser] = useState<string | null>(null);
  const [memory, set_memory_method] = useState<string >("ConversationSummaryMemory");
  const [chain_type, set_chain_type] = useState<string>("LLMChain");
  const [model_name, setmodel_name] = useState<string> ("gpt-3.5-turbo");
  const setting_bot = useRef<HTMLTextAreaElement | null>(null);

  
  const submit = () => {
    const api_key = localStorage.getItem('api_key')! //api_key is checked already
    const model = new OpenAI({temperature: temp , openAIApiKey: api_key,verbose:true,modelName:model_name})
    const config_obj: Config = {
      temperature: temp,
      prompt_template:setting_bot.current!.value,
      resp_parser: parser , 
      memory_method: memory ,
      chain_type: chain_type,
      model:  model ,
      memory: memory==="BufferMemory" ? new BufferMemory({memoryKey: "chat_history"}) : new ConversationSummaryMemory({llm:model})
    }
    set_config(config_obj)
  }
 
  const TEMPLATE_PROMPT = "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."

  return (
    <>
    <div className='col-span-1'>
      <div>
        <label>Temperature:
         
          <select onChange={(e)=>set_temp(parseFloat(e.target.value))} className=' bg-slate-600'>
              <option value="0.0">0.0</option>
              <option value="0.1">0.1</option>
              <option value="0.2">0.2</option>
              <option value="0.3">0.3</option>
              <option value="0.4">0.4</option>
              <option value="0.5">0.5</option>
              <option value="0.6">0.6</option>
              <option value="0.7">0.7</option>
              <option value="0.8">0.8</option>
              <option value="0.9">0.9</option>
              <option value="1.0">1.0</option>
              <option value="1.1">1.1</option>
              <option value="1.2">1.2</option>
              <option value="1.3">1.3</option>
              <option value="1.4">1.4</option>
              <option value="1.5">1.5</option>
              <option value="1.6">1.6</option>
              <option value="1.7">1.7</option>
              <option value="1.8">1.8</option>
              <option value="1.9">1.9</option>
              <option value="2.0">2.0</option>
 

          </select>
        </label>
      </div>
      <div>
        <label>Module : 
          <select onChange={(e)=>setmodel_name(e.target.value)} className=' bg-slate-600'>
          <option value={"gpt-3.5-turbo"}>gpt-3.5-turbo</option>
          <option value={"text-davinci-003"}>text-davinci-003</option>
          <option value={"gpt-4"}>gpt-4</option>
          </select>
        </label>
      </div>


      <div className='flex flex-col'>
        <label>Setting of the bot</label>
        <textarea placeholder={TEMPLATE_PROMPT} className=' bg-slate-600 border-slate-50 border-2 h-52 ' ref={setting_bot}></textarea>
      </div>

      <div>
        <label>Structure bot respond: </label>
        <select onChange={e => { set_parser(e.target.value) }} className=' bg-slate-600'>
          <option value={"Json"}>Json format(default)</option>
          <option value={"Customize"}>Customize</option>
        </select>
        {parser === "Customize" && (<textarea placeholder={""} className=' bg-slate-600 border-slate-50 border-2 h-min '></textarea>)}
      </div>
      <div>
        <label>Memory method:
          <select onChange={e => { set_memory_method(e.target.value) }} className=' bg-slate-600'>
            <option value={"BufferMemory"}>BufferMemory</option>
            <option value={"ConversationSummaryMemory"}>ConversationSummaryMemory</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Chain type:
          <select onChange={e => { set_chain_type(e.target.value) }} className=' bg-slate-600'>
            <option value={"LLMChain"}>LLMChain(default)</option>
            <option value={"StuffDocumentsChain"}>StuffDocumentsChain</option>
            <option value={"MapReduceDocumentsChain"}>MapReduceDocumentsChain</option>
            <option value={"RefineDocumentsChain"} >RefineDocumentsChain</option>
            <option value={"RetrievalQAChain"} >RetrievalQAChain</option>
            <option value={"ConversationalRetrievalQA"} >ConversationalRetrievalQA</option>
          </select>
        </label>
      </div>
      <button onClick={submit} type='submit' className='border-white border-2'>Create chain and chat!</button>
    </div >

     {config&& <PlayGround  config={config}/>}
    </>
     
  )
}

export default Control_Panel