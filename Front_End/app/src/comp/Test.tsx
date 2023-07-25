import React, { useEffect, useState } from 'react'
import Display_Pdf from './Playground/Display_Pdf'
import Axios from "axios"
import { url } from 'inspector'
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
type Props = {}

function Test({}: Props) {
  const [blob, setblob] = useState<null| Uint8Array>(null);
   /*
    const api_call_to_S3 = async() =>{
       const S3_client = new S3Client({
          region:"us-east-2",
          credentials:{
            accessKeyId:'AKIASC2K7IHCBSVRFKR5',
            secretAccessKey:'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'
          }
       })
       
       const command = new GetObjectCommand({
        Bucket:'chatpdfedmundchan70',
        Key:'76ec8e4b-72d9-4383-a8a2-9be7e5da2074'
      })
      const {Body} = await  S3_client.send(command);
      const data_blob= await Body?.transformToByteArray()
     // setblob(()=>data_blob!)
      setblob(data_blob || null);
       
    }
    */
    useEffect(()=>{
     // api_call_to_S3()
 
    },[]) 
  
    return blob ? <Display_Pdf Data={blob} /> : <>LOADING</>;
}

export default Test