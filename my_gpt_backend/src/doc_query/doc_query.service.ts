import { Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CharacterTextSplitter } from "langchain/text_splitter";
 
import "@tensorflow/tfjs-backend-cpu";
 
 
import { text_chunk } from '../DTO/doc_query/text_chunk.dto';
import HNSWLib_search from './util/HNSWLib';
import { openAiService } from 'src/openAI/openAi.service';

 
@Injectable()
export class doc_query_service {
  constructor(private openAiService: openAiService){}
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
        const output = await splitter.splitDocuments(docs);
        console.log(output.length)
        console.log("COMPLETED REQIESRT file_to_text_chunk")
        return {
          split_chunk : output, 
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

}


 
