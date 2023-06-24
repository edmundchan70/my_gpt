import { Controller, UseInterceptors, UploadedFile, Post, ParseFilePipe, FileTypeValidator, Body, Get   } from '@nestjs/common';
 import {FileInterceptor} from "@nestjs/platform-express"
import { doc_query_service } from './doc_query.service';
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
            return this.doc_query_service.process_file(file)}
}