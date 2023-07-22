import { Module } from '@nestjs/common';
import { doc_query_controller } from '../doc_query/doc_query.controller';
import { doc_query_service } from './doc_query.service';
import { ConfigModule } from '@nestjs/config';
import { openAiModule } from 'src/openAI/openAi.module';
import { pineconeService } from 'src/pinecone/pinecone.service';
import { pineconeModule } from 'src/pinecone/pinecone.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
 
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports:[openAiModule,ConfigModule.forRoot(),pineconeModule,JwtModule.register({}),PrismaModule],
    controllers: [doc_query_controller],
    providers: [doc_query_service],
})
export class doc_query_module {};