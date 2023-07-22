import { Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { RetrievalQAChain } from "langchain/chains"

import { text_chunk } from '../DTO/doc_query/text_chunk.dto';
import HNSWLib_search, { text_chunktoString } from './util/HNSWLib';
import { openAiService } from 'src/openAI/openAi.service';
import { pineconeService } from 'src/pinecone/pinecone.service';
import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { TensorFlowEmbeddings } from 'langchain/embeddings/tensorflow';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from 'src/auth/DTO/jwtPayload.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class doc_query_service {
  constructor(private openAiService: openAiService,
     private pineConeService: pineconeService,
     private prisma: PrismaService,
     private jwtService: JwtService 
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
    console.log(split_text.length)
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
  
    console.log('decode info',decoded_info)
    const {id} = await this.get_userId_by_email(decoded_info.email)
    await this.prisma.document.create({
      data:{
        doc_id:doc_id,
        FileName:fileName,
        owner_id:id,
        content:rawData,
      }
    })
    console.log(id)
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

  async similarity_search(text_chunk_array: text_chunk[], query: string, k?: number) {
    const HNSWLib_startTime = Date.now(); // Start timer  
    const { str_rep, text_chunk } = await HNSWLib_search(text_chunk_array, query, k);
    const HNSWLib_endTime = Date.now(); // End timer
    return {
      msg: str_rep,
      text_chunk: text_chunk,
      vectorStore_search: (HNSWLib_endTime - HNSWLib_startTime) / 1000
    }
  }

  async generate_text_chunk(chunkOverlap: number, chunkSize: number, rawData: string) {
    console.log(rawData)
    const splitter = new CharacterTextSplitter({
      separator: ".",
      chunkOverlap: chunkOverlap,
      chunkSize: chunkSize
    })

    return await splitter.createDocuments([rawData])
  }
  async save_embedding() {
    const fileName = 'docname';
    return this.pineConeService.create_index(fileName);
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
}



