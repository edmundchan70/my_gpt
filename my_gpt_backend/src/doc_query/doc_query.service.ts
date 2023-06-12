import { Injectable } from '@nestjs/common';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain, loadQAMapReduceChain } from "langchain/chains";
import { Document } from "langchain/document";
@Injectable()
export class doc_query_service {
    set_doc(file :Express.Multer.File){
        
    }   
}
