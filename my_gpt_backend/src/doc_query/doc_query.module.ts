import { Module } from '@nestjs/common';
import { doc_query_controller } from '../doc_query/doc_query.controller';
import { doc_query_service } from './doc_query.service';
import { ConfigModule } from '@nestjs/config';
import { openAiModule } from 'src/openAI/openAi.module';
import { pineconeService } from 'src/pinecone/pinecone.service';
import { pineconeModule } from 'src/pinecone/pinecone.module';

@Module({
    imports:[openAiModule,ConfigModule.forRoot(),pineconeModule],
    controllers: [doc_query_controller],
    providers: [doc_query_service],
})
export class doc_query_module {};