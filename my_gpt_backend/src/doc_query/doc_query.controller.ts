import { Controller, UseInterceptors, UploadedFile, Post, ParseFilePipe, FileTypeValidator, Body, Get   } from '@nestjs/common';
 import {FileInterceptor} from "@nestjs/platform-express"
import { doc_query_service } from './doc_query.service';
import { chat_body } from '../DTO/doc_query/chat_body.dto';
 
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

    @Post('chat')
    chat(@Body()Body :chat_body  ){
        const {text_chunk,query} = Body    
        const API_KEY :string  = process.env.OPENAI_API_KEY_TEST
        return this.doc_query_service.chat(text_chunk,query,API_KEY);
    }

        }