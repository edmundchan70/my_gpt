import { Controller, UseInterceptors, UploadedFile, Post, ParseFilePipe, FileTypeValidator,Response, Body, Get, Headers, Res, Header   } from '@nestjs/common';
 import {FileInterceptor} from "@nestjs/platform-express"
import { doc_query_service } from './doc_query.service';
import { chat_body } from './DTO/chat_body.dto';
import { config_text_chunk } from 'src/doc_query/DTO/config_text_chunk.dto';
import { Public } from 'src/common/decorators';
import { S3Service } from 'src/S3/S3.service';
 
 
 
 
@Controller('doc_query')
export class doc_query_controller {
    constructor(private doc_query_service : doc_query_service){}

    @Get("")
    check_doc_query(){
        console.log("doc_query running");
    }
    @Post('chat')
    chat(@Body()Body :chat_body  ){
        const {text_chunk,query} = Body    
        const API_KEY :string  = process.env.OPENAI_API_KEY_TEST
        console.log(text_chunk)
        return this.doc_query_service.chat_retrievalQAChain(text_chunk,query);
    }
 
    @Post('upload_pdf')
    @UseInterceptors(FileInterceptor('document'))
    handle_file(
        @Headers('Authorization') token: string,
        @Body() Body :any, //change  
        @UploadedFile(
        new ParseFilePipe({
            validators:[
                new FileTypeValidator({fileType: "pdf"})]
        })) file: Express.Multer.File)
        {
            console.log(file.originalname)
    return this.doc_query_service.file_to_text_chunk(file,token)

    }
    
    @Post("get_user_document_list")
    get_user_document_list(
        @Headers('Authorization') token: string
    ){
        return this.doc_query_service.get_user_document_list(token)
    }
    @Post("get_document_detail")
    get_document_detail(
        @Headers('Authorization') token: string
    ){
        return this.doc_query_service.get_document_detail(token);
    }
}



 






 