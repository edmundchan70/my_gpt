import { Controller, UseInterceptors, UploadedFile, Post, ParseFilePipe, FileTypeValidator, Body, Get   } from '@nestjs/common';
 import {FileInterceptor} from "@nestjs/platform-express"
import { doc_query_service } from './doc_query.service';
import { chat_body } from '../DTO/doc_query/chat_body.dto';
import { config_text_chunk } from 'src/DTO/doc_query/config_text_chunk.dto';
 
@Controller('doc_query')
export class doc_query_controller {
    constructor(private doc_query_service : doc_query_service){}

    @Get("")
    check_doc_query(){
        console.log("doc_query running");
    }

    @Post('upload_pdf')
    @UseInterceptors(FileInterceptor('document'))
    handle_file(
        @Body() Body :any, //change 
        @UploadedFile(
        new ParseFilePipe({
            validators:[
                new FileTypeValidator({fileType: "pdf"})]
        })) file: Express.Multer.File)
        {
            console.log(file.originalname)
    return this.doc_query_service.file_to_text_chunk(file)
}
    @Post('generate_text_chunk')
    generate_text_chunk(@Body() Body:config_text_chunk){
        const {chunkOverlap,chunkSize,rawData} =Body;
        console.log(Body);
        return this.doc_query_service.generate_text_chunk(chunkOverlap,chunkSize,rawData)

    }
    @Post('chat')
    chat(@Body()Body :chat_body  ){
        const {text_chunk,query} = Body    
        const API_KEY :string  = process.env.OPENAI_API_KEY_TEST
        return this.doc_query_service.chat(text_chunk,query,API_KEY);
    }
    @Post('similarity_search')
    similarity_search(@Body() Body: chat_body){
        const {text_chunk,query,chunk_return } = Body   //chunk_return == k
     
        return this.doc_query_service.similarity_search(text_chunk,query,chunk_return);
    }
    @Post('/save_embedding')
    save_embedding(@Body()Body :any){
        return this.doc_query_service.save_embedding();
    }
        }