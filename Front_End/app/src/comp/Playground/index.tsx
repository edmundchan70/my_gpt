import React, { useRef } from 'react'
import Message_container from './Message_container'
 
import { Conversation } from '../Conversation/Conversation.class';
 
type Props = {}

function PlayGround({}: Props) {
  const userInput = useRef<HTMLInputElement | null>(null);
 
  return (
      
          <Message_container  />
  
  )
}

export default PlayGround