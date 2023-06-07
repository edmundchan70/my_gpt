import React, { useRef } from 'react'
import Message_container from './Message_container'
 
import { Conversation } from '../Conversation/Conversation.class';
 
type Props = {chain_obj : Conversation}

function PlayGround({chain_obj}: Props) {
  const userInput = useRef<HTMLInputElement | null>(null);
  console.log(chain_obj)
 
  return (
    <div className='col-span-4'>
          <Message_container chain_obj={chain_obj} />
    </div>
  )
}

export default PlayGround