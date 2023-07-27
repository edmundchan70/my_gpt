import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const get_file_from_s3 = async (FileName: string) =>{
    if(!process.env.REACT_APP_S3_ACCESS_KEY || !process.env.REACT_APP_S3_SECRETE_KEY|| !process.env.REACT_APP_S3_BUCKET_REGION  || ! process.env.REACT_APP_S3_BUCKET_NAME){ 
        alert("Invalid credentials for S3") 
        return null;}
    const S3_client = new S3Client({
       region:process.env.REACT_APP_S3_BUCKET_REGION,
       credentials:{
         accessKeyId:process.env.REACT_APP_S3_ACCESS_KEY,
         secretAccessKey: process.env.REACT_APP_S3_SECRETE_KEY
       }
    })
    
    const command = new GetObjectCommand({
     Bucket:process.env.REACT_APP_S3_BUCKET_NAME,
     Key:FileName
   })
   const {Body} = await  S3_client.send(command);
   const data_blob= await Body?.transformToByteArray()
   console.log(data_blob)
   return data_blob
  // setblob(()=>data_blob!)
 }