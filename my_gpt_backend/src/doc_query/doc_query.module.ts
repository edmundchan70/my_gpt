import { Module } from '@nestjs/common';
import { doc_query_controller } from '../doc_query/doc_query.controller';
import { doc_query_service } from './doc_query.service';
import { ConfigModule } from '@nestjs/config';
import { openAiModule } from 'src/openAI/openAi.module';

@Module({
    imports:[openAiModule,ConfigModule.forRoot()],
    controllers: [doc_query_controller],
    providers: [doc_query_service],
})
export class doc_query_module {};