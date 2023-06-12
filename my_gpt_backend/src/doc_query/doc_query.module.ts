import { Module } from '@nestjs/common';
import { doc_query_controller } from '../doc_query/doc_query.controller';
import { doc_query_service } from './doc_query.service';

@Module({
    controllers: [doc_query_controller],
    providers: [doc_query_service,],
})
export class doc_query_module {};