import { Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { Blob } from 'buffer' // this is from node
import "@tensorflow/tfjs-backend-cpu";
import { TensorFlowEmbeddings } from "langchain/embeddings/tensorflow";
import "@tensorflow/tfjs-backend-cpu";
import { doc } from 'prettier';
import { text_chunk } from './DTO/text_chunk.dto';
import HNSWLib_search from './util/HNSWLib';
import { query } from 'express';
import { optimzie_text_chunk } from './util/optimize_text_chunk.js';

@Injectable()
export class doc_query_service {
    async file_to_text_chunk(file: Express.Multer.File)  {
        const loader = new PDFLoader( new Blob([file.buffer], { type: 'application/pdf' }),{
            splitPages: false,
        });
        const docs = await loader.load();
        return  optimzie_text_chunk(file.buffer);
        const splitter = new CharacterTextSplitter({
            separator: ".",
            chunkSize: 300,
            chunkOverlap:50
            
          });
        const output = await splitter.splitDocuments(docs);
        return output
      }
    async chat(text_chunk_array: text_chunk[],query:string ,API_KEY){
        const startTime = Date.now(); // Start timer  
        const related_chunk = await HNSWLib_search(text_chunk_array,query);
        const endTime = Date.now(); // End timer
        return {
          msg : related_chunk,
          total_time:   endTime -startTime
        }
    }
}


 
