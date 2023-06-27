import { Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CharacterTextSplitter } from "langchain/text_splitter";
 
 
 
 
import { text_chunk } from '../DTO/doc_query/text_chunk.dto';
import HNSWLib_search, { text_chunktoString } from './util/HNSWLib';
import { openAiService } from 'src/openAI/openAi.service';
import { pineconeService } from 'src/pinecone/pinecone.service';

 
@Injectable()
export class doc_query_service {
  constructor(private openAiService: openAiService ,private pineConeService:pineconeService){}
    async file_to_text_chunk(file: Express.Multer.File)  {
        const loader = new PDFLoader( new Blob([file.buffer], { type: 'application/pdf' }),{
            splitPages: false,
        });
        const docs = await loader.load();
        const chunkSize = 222 ;
        const chunkOverlap = 50 ; 
        const splitter = new CharacterTextSplitter({
            separator: ".",
            chunkSize:chunkSize,
            chunkOverlap:chunkOverlap,
          });
        const split_text = await splitter.splitDocuments(docs);
        console.log(split_text.length)
        console.log("COMPLETED REQIESRT file_to_text_chunk")
        //filter out the metadata in output
        const output = split_text.map(item=>{
          const {metadata,...newItem} = item ;
          return newItem
        })
        const rawData = text_chunktoString(split_text)
        return {
          split_chunk : output, 
          rawData: rawData,
          relevent_data: {
            chunkSize: chunkSize,
            chunkOverlap: chunkOverlap
          }
        }
      }
    async chat(text_chunk_array: text_chunk[],query:string ,API_KEY){
        const HNSWLib_startTime = Date.now(); // Start timer  
        const related_chunk = await HNSWLib_search(text_chunk_array,query);
        
        const HNSWLib_endTime = Date.now(); // End timer
        
        const query_start = Date.now(); 
        const resp = await this.openAiService.chat(query,related_chunk,API_KEY);
        const query_End = Date.now(); 
        const {content} = resp.choices[0].message
        console.log(resp.choices)
        return {
          msg : content,
          vectorStore_search:   HNSWLib_endTime -HNSWLib_startTime,
          query_time: query_End-query_start,
          total_time: query_End - HNSWLib_startTime
        }
    }
    async similarity_search(text_chunk_array,query,chunk_return){
      const HNSWLib_startTime = Date.now(); // Start timer  
      const related_chunk = await HNSWLib_search(text_chunk_array,query,chunk_return);
      const HNSWLib_endTime = Date.now(); // End timer
      return {
        msg: related_chunk,
        vectorStore_search:   HNSWLib_endTime - HNSWLib_startTime
      }
    }

    async generate_text_chunk(chunkOverlap:number ,chunkSize:number ,rawData :string){
      console.log(rawData)
      const splitter = new CharacterTextSplitter({
        separator:".",
        chunkOverlap:chunkOverlap,
        chunkSize:chunkSize
      })

      return await splitter.createDocuments([rawData])
    }
    async save_embedding(){
        const fileName = 'docname';
        return this.pineConeService.create_index(fileName);
    }
}


 
