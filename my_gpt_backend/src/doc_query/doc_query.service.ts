import { ForbiddenException, Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RetrievalQAChain } from "langchain/chains"
import { text_chunk } from './DTO/text_chunk.dto';
import { openAiService } from 'src/openAI/openAi.service';
import { pineconeService } from 'src/pinecone/pinecone.service';
import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { TensorFlowEmbeddings } from 'langchain/embeddings/tensorflow';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
 
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/S3/S3.service';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
 
import { text_chunk_to_DB, text_chunktoString } from './util/HNSWLib';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { user_info } from './DTO/user_info.dto';
 


@Injectable()
export class doc_query_service {
  constructor(private openAiService: openAiService,
     private pineConeService: pineconeService,
     private prisma: PrismaService,
     private jwtService: JwtService ,
     private S3 : S3Service
     ) { }
  
  async file_to_text_chunk(file: Express.Multer.File, token: string) {
    const loader = new PDFLoader(new Blob([file.buffer], { type: 'application/pdf' }), {
      splitPages: false,
    });
    const docs = await loader.load();
    const chunkSize = 222;
    const chunkOverlap = 50;
    /* const splitter = new CharacterTextSplitter({
         separator: ".",
         chunkSize:chunkSize,
         chunkOverlap:chunkOverlap,
      }); */
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 300 });
    const split_text = await splitter.splitDocuments(docs);
 
    console.log("COMPLETED REQIESRT file_to_text_chunk")
    //filter out the metadata in output
    const output = split_text.map(item => {
      const { metadata, ...newItem } = item;
      return newItem
    })
    const rawData = text_chunktoString(split_text);
    const doc_id = randomUUID()
 
    const fileName = file.originalname
    const  decoded_info :any  = this.jwtService.decode(token.slice("Bearer ".length));
  
 
    const {id} = await this.get_userId_by_email(decoded_info.email)
    //doc_id will also be S3 fileName
    try{
    await this.prisma.document.create({
      data:{
        doc_id:doc_id,
        FileName:fileName,
        owner_id:id,
        content:rawData,
      }
    })}catch(err:any){
      throw new ForbiddenException("FILE NAME MUST BE UNIQUE ")
    }
    //Init S3 command and save the file 
    const command =    new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: doc_id,
        Body: file.buffer
      });
      try {
        const response = await this.S3.send(command);
        console.log(response);
      } catch (err) {
          throw err
      }
    console.log('save to S3 success')
    console.log(id)
    //save text chunk to db
    const text_chunk_db = text_chunk_to_DB(split_text,doc_id,id)
    console.log(text_chunk_db)
    await this.prisma.textChunk.createMany({
      data: text_chunk_db
    })
    return {
      split_chunk: output,
      rawData: rawData, 
      relevent_data: {
        chunkSize: chunkSize,
        chunkOverlap: chunkOverlap
      }
    }
  }

  async chat_retrievalQAChain(text_chunk_array: text_chunk[], query: string) {
    console.log("chat_retrievalQAChain call activated")
    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY_TEST,
      modelName: "gpt-4"
    })
    console.log('Vector store init')
    const vectorStore = await HNSWLib.fromDocuments(text_chunk_array, new TensorFlowEmbeddings());

    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    console.log("Querying llm call activated")
    const res = await chain.call({
      query: query
    });
    return { msg: res }
  }
  async get_user_document_list(token: string){
   const decode_info :user_info = await this.decode_user_from_token(token);
   const {sub} = decode_info;
 
   return await this.prisma.document.findMany({
      where:{
        owner_id:sub
      },
      select:{
        FileName:true,
        doc_id:true 
      },
      orderBy: {CreatDate: 'desc'} 
    })

  }
  async get_document_detail(token:string)  {
    
  }
  
  //helper functions 
  async get_userId_by_email(email: string) {
  return  this.prisma.user.findUnique({
      where:{
        email:email 
      },
      select:{
        id:true
      }
    })
  }
  async put_file_to_S3(fileName:string) {

  }
  async get_file_from_S3(fileName: string ){
    const command  = new GetObjectCommand({
      Bucket:process.env.S3_BUCKET_NAME,
      Key:fileName
    })
    //console.log(command)
    try{
     const {Body} = await  this.S3.send(command);
     const blob  =await Body.transformToWebStream();
     console.log('byte: ',blob)
     return blob;
    }
     catch(err){
      console.log( err.Code)
        return err.Code
     }
     
 
     
      
    
  }
  async decode_user_from_token(token:string) :Promise<user_info>{
    try {
      const decodedData = await this.jwtService.decode(token.slice("Bearer ".length));
      return decodedData as user_info;
    } catch (error) {
      // Handle error, if needed
      throw new Error("Unable to decode user information");
    }
  }
  
}



