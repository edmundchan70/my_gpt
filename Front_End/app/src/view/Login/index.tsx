import { Configuration, OpenAIApi } from 'openai';
import React, { useRef } from 'react'
import { handle_error } from '../../api/error/handleError';
import { AiOutlineSend } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


type Props = {}

function Login({}: Props) {
    const nav = useNavigate();
    //right now login is just to get the api key 
    //API_Key should be check using useEffect, then whenever updated , validate and nav HOMEPAGE
    const getInput = useRef<HTMLInputElement | null>(null);
    const valid_api = async () : Promise<boolean>  => {
      const configuration = new Configuration({
        organization: "org-EVepSWx7EGMJzKHT3eCJVvb4",
        apiKey: getInput.current!.value ,
     });
     const openai = new OpenAIApi(configuration);
      try{
      const resp=  await openai.listModels()
      console.log(resp)
      return true
      }catch(error){
        console.log(error)
        alert(handle_error(401));
        return false
      }};
    const set_api_key = async ()=>{
    if(!getInput.current){
        alert("PLEASE ENTER YOUR API KEY");return ;}

    const response = await valid_api()
  
      // at last , set api_key, might need encryption future
    if(response)
      localStorage.setItem('api_key',getInput.current!.value)
      console.log("SET")
        nav("/Home")
    }
    //MUST VALID THE API KEY THEN REDIRECT TO PLAYGROUND 
    return (
      <div className="App">
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
        
      </div>)
 
}

export default Login