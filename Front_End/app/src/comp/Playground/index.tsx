import React, { useRef } from 'react'
import Message_container from './Message_container'
import { Config } from '../DTO/Config.dto';
 
type Props = {config : Config}

function PlayGround({config}: Props) {
  const userInput = useRef<HTMLInputElement | null>(null);
  console.log(config)
  console.log(!NaN)
  return (
    <div className='col-span-4'>
          <Message_container config={config} />
    </div>
  )
}

export default PlayGround