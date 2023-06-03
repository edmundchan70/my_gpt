import { Console } from 'console';
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

function Control_Panel({}: Props) {
 
  const temp_ref = useRef<HTMLInputElement |null>(null);
  const [parser,set_parser] = useState<String|null>(null);
  const [memory,set_memory_method] = useState<String|null>(null);
  const [chain_type,set_chain_type]= useState<String|null>(null);
  const config_ref =  useRef<HTMLTextAreaElement |null>(null); 
  const TEMPLATE_PROMPT = "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
  
  return (
    <div className='col-span-1'>
        <div>
         <label>Temperature: <input type='text' className='w-5 bg-slate-600 border-slate-50 ml-3.5 border-2 rounded' ref={temp_ref} /></label>
        </div>
        <div>
          <label>Module : GPT-3.5</label>
        </div>


        <div className='flex flex-col'>
            <label>Setting of the bot</label>
            <textarea  placeholder={TEMPLATE_PROMPT} className=' bg-slate-600 border-slate-50 border-2 h-52 ' ref={config_ref}></textarea>
        </div>
        
        <div>
          <label>Structure bot respond: </label>
                <select onChange={e=>{set_parser(e.target.value)}} className=' bg-slate-600'>
                    <option  value={"Json"}>Json format(default)</option>
                    <option  value={"Customize"}>Customize</option>
                </select>
                {parser ==="Customize" && (<textarea  placeholder={""} className=' bg-slate-600 border-slate-50 border-2 h-min '></textarea>)}
        </div>
        <div>
          <label>Memory method: 
          <select onChange={e=>{set_memory_method(e.target.value)}} className=' bg-slate-600'>
                    <option  value={"Buffer memory"}>BufferMemory</option>
                    <option  value={"ConversationSummaryMemory"}>ConversationSummaryMemory</option>
                </select>
          </label>
        </div>
        <div>
          <label>
            Chain type: 
                <select onChange={e=>{set_chain_type(e.target.value)}} className=' bg-slate-600'>
                   <option  value={"LLMChain"}>LLMChain</option>
                    <option  value={"StuffDocumentsChain"}>StuffDocumentsChain</option>
                    <option  value={"MapReduceDocumentsChain"}>MapReduceDocumentsChain</option>
                    <option value={"RefineDocumentsChain"} >RefineDocumentsChain</option>
                    <option value={"RetrievalQAChain"} >RetrievalQAChain</option>
                    <option value={"ConversationalRetrievalQA"} >ConversationalRetrievalQA</option>
                </select>
          </label>
        </div>
    </div>
  )
}

export default Control_Panel