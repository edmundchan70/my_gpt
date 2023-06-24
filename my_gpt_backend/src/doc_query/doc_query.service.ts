import { Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { Blob } from 'buffer' // this is from node
import "@tensorflow/tfjs-backend-cpu";
import { TensorFlowEmbeddings } from "langchain/embeddings/tensorflow";
import "@tensorflow/tfjs-backend-cpu";
import { doc } from 'prettier';

@Injectable()
export class doc_query_service {
    async   process_file(file: Express.Multer.File) {
        const loader = new PDFLoader( new Blob([file.buffer], { type: 'application/pdf' }),{
            splitPages: false,
        });
        const docs = await loader.load();
        const splitter = new CharacterTextSplitter({
            separator: " ",
            chunkSize: 30,
            chunkOverlap: 5,
          });
          
        const output = await splitter.splitDocuments(docs);
      
        const vectorStore = await HNSWLib.fromDocuments(docs, new TensorFlowEmbeddings());
        const result =await vectorStore.similaritySearch('skill',1);
        console.log(result);
        const new_text = result[0].pageContent.replace(/[\r\n]+/g, ' ');
        return new_text
      
      }
    
}
