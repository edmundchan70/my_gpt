import React, { useRef, useState } from 'react'
import AI_ICON from "../../assets/AI_ICON.jpeg" 
import USER_ICON from "../../assets/USER_ICON.jpeg" 
import {AiOutlineSend} from "react-icons/ai"
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

import { Config } from '../DTO/Config.dto'
type Props = {
  config : Config
}
type Message ={
  send_time: Date
  msg: String 
  sender:  "user" | "AI"
} 
 
 
function Message_container({config} : Props) {
  const testMessage  : Message[]  = [{
      send_time:  new Date(), 
      msg: "HELLo, AI",
      sender:"user"
  },
  {
      send_time:  new Date(),
      msg: "HELLo, human",
      sender:"AI"
  }
  ]
   
  const static_prompt = config.prompt_template +"Current conversation: {chat_history}, Human: {input}"
  
  const [msg_list, set_msg_list] = useState<Message[]>(testMessage)
  const userInput = useRef<HTMLInputElement | null>(null);
  const getInput =() =>{
    if(!userInput.current)
      alert("Please enter something!")
    const message_obj : Message ={
      send_time : new Date(),
      msg: userInput.current!.value ,
      sender: "user"
    }
    set_msg_list((prev)=>[
      ...prev,message_obj
    ])
    //clean up input 
    userInput.current!.value = "";
  }
  return (
    <div >
        {msg_list?.map(
          (msg: Message) =>{ 
            return (
                <div className='flex space-x-52 '>
                    <img src={msg.sender==="AI"? AI_ICON  :USER_ICON  }  className='w-14 '/>
                    <h5>{msg.msg}</h5>
                </div>
            )
          }
        )}
         <div >
               <label className="flex items-center" > Enter your message here: 
                <div className='border-slate-50 ml-3.5 border-2 rounded'>
                      <input ref={userInput}  className='bg-slate-600'  type="text" placeholder='Enter your prompt'/> 
                    <button onClick={getInput}  type='submit'><AiOutlineSend /></button>
                </div>
               
               </label> 
          </div>
        
    </div>
  )
}

export default Message_container