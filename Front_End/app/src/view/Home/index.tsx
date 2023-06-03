import React, { useEffect, useState } from 'react'
import PlayGround from '../../comp/Playground'
import { get_api_key } from '../../util/get_api_key'
import { useNavigate } from 'react-router-dom'


type Props = {}

function Home({}: Props) {
  const nav = useNavigate();
  useEffect(()=>{
     if(!get_api_key())
        nav('/Login');
  },[])
  return (
    <div>
      <PlayGround />
    </div>
  )
}

export default Home