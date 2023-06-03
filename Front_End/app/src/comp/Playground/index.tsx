import React, { useRef } from 'react'
import Message_container from './Message_container'
 
type Props = {}

function PlayGround({}: Props) {
  const userInput = useRef<HTMLInputElement | null>(null);
  const getInput =() =>{
    console.log(userInput.current?.value)
    //clean up input 
    userInput.current!.value = "";
  }
  return (
    <div className=''>
          <Message_container />
    </div>
  )
}

export default PlayGround