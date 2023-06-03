import React, { useEffect, useState } from 'react'
import PlayGround from '../../comp/Playground'
import { get_api_key } from '../../util/get_api_key'
import { useNavigate } from 'react-router-dom'
import Control_Panel from '../../comp/Control_Panel'


type Props = {}

function Home({}: Props) {
  const nav = useNavigate();
  useEffect(()=>{
     if(!get_api_key())
        nav('/Login');
  },[])
  return (
    <div className='grid grid-cols-5 bg-slate-600 text-slate-50'>
      <Control_Panel />
 
    </div>
  )
}

export default Home