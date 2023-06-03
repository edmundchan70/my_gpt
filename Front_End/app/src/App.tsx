import React, { useRef } from 'react';
import PlayGround from './comp/Playground';
import { AiOutlineSend } from 'react-icons/ai';
import { Configuration, OpenAIApi } from "openai";
import { handle_error } from './api/common/handleError';
 
 

function App() {
  const getInput = useRef<HTMLInputElement | null>(null);
  const set_api_key = async ()=>{
    if(!getInput.current)
      alert("PLEASE ENTER YOUR API KEY");
    //then validate the API key
 
    const configuration = new Configuration({
      organization: "org-EVepSWx7EGMJzKHT3eCJVvb4",
      apiKey: getInput.current!.value ,
  });
  const openai = new OpenAIApi(configuration);
  const valid_api = async ()=> {
    try{
    const resp=  await openai.listModels()
    console.log(resp)
    return true
    }catch(error){
      console.log(error)
      alert(handle_error(401));
      return false
    }
  };
  const response = await valid_api()
 
  console.log(response)
    // at last , set it
  if(response)
    localStorage.setItem('apiKey',getInput.current!.value)
    console.log("SET")
  }
  //MUST VALID THE API KEY THEN REDIRECT TO PLAYGROUND 
  return (
    <div className="App">

       {localStorage.getItem('apiKey')? <PlayGround /> :
       <div className="max-w-lg mx-auto md:flex md:h-screen md:items-center mb-6 flex">
         <input
           className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
           type="text"
           ref={getInput}
           placeholder="Enter API Key"
           onSubmit={set_api_key}
         />
         <button type='submit' onClick={set_api_key} ><AiOutlineSend size={'2.5rem'}/></button>
       </div>
     
     
          }
      
    </div>
  );
}

export default App;
