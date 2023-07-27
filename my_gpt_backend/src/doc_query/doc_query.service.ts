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
import { DB_to_text_chunk, text_chunk_to_DB, text_chunktoString } from './util/HNSWLib';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { user_info } from './DTO/user_info.dto';
import { conversation } from './DTO/conversation.dto';
import { chat_body } from './DTO/chat_body.dto';
 


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
    await this.put_file_to_S3(doc_id,file);
    
    console.log(id)
    //save text chunk to db
    const text_chunk_db = text_chunk_to_DB(split_text,doc_id,id)
    console.log(text_chunk_db)
    await this.prisma.textChunk.createMany({
      data: text_chunk_db
    })
    return {
      doc_id: doc_id,
      FileName:fileName,
    }
  }

  async chat_retrievalQAChain({doc_id,query}: chat_body , token: string) {
    const owner_id = await this.get_userId_by_token(token)
    console.log("chat_retrievalQAChain call activated")
    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY_TEST,
      modelName: "gpt-4"
    })
    console.log('Vector store init')
    //transform data in db into corresponding data structure
    const text_chunk_array : text_chunk[] = await DB_to_text_chunk(await this.retreive_text_chunk(doc_id,owner_id));

    const vectorStore = await HNSWLib.fromDocuments(text_chunk_array, new TensorFlowEmbeddings());

    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    console.log("Querying llm call activated")
    const {text} = await chain.call({
      query: query
    });
    //save to db 
    const HUMAN_MESSAGE : conversation={
      doc_id: doc_id,
      owner_id: owner_id,
      role: "HUMAN",
      Message:query
    }
    const AI_RESPONSE: conversation={
      doc_id: doc_id,
      owner_id: owner_id,
      role: "AI",
      Message:text
    }
    //add HUMAN MESSAGE 
    await this.prisma.conversation.create({
      data:HUMAN_MESSAGE
    })
    //add AI Message 
    await this.prisma.conversation.create({
      data:AI_RESPONSE
    })
    return { msg: text }
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
  async get_document_detail(token:string,doc_id:string)  {
    /**
     * 1. Take the conversation infomraiton
     * 2. Get the pdf document from S3
     * 
     */
    const owner_id = await this.get_userId_by_token(token);
    //load conversation history
    const conversation_history = await this.prisma.conversation.findMany({
      where:{
        doc_id:doc_id,
        owner_id:owner_id
      },select:{
        MessageTime:true,
        Message:true,
        role:true
      }
    })
    return {
      conversation_history: conversation_history
    }

    
  }
  
  //helper functions 
  async retreive_text_chunk(doc_id:string,user_id : number){
    const text_chunk = await this.prisma.textChunk.findMany({
      where:{
        owner_id:user_id,
        doc_id:doc_id,
      },
      select:{
        text_chunk:true
      }
    })
   // const plainArray = text_chunk.map((chunk) => chunk.text_chunk);
    console.log(text_chunk)
    return text_chunk
  }
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
  async get_userId_by_token(token: string):Promise<number> {
    const decode_info :user_info = await this.decode_user_from_token(token);
    const {sub} = decode_info;
    return sub 
  }
  async put_file_to_S3(doc_id:string,file: Express.Multer.File) {
    const command =    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: doc_id,
      Body: file.buffer
    });
    try {
      const response = await this.S3.send(command);
      console.log(response);
      return response
    } catch (err) {
        throw err
    }
   
    
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
  async update_chat(doc_id:string, owner_id:number ,Message:string,role:"AI"|"HUMAN"){
    return await this.prisma.conversation.create({
      data: {
          doc_id: doc_id,
          owner_id:owner_id,
          Message: Message,
          role: role
      }
    })
  }
  async generate_summary(doc_id:string, token:string){
      const query = 'GIVE ME THE SUMMARY OF THE DOCUMENT';
      const resp =  await this.chat_retrievalQAChain({doc_id:doc_id,query:query},token)
      return resp.msg.text;
  } 
  
}



