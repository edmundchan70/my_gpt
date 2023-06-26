import { Module } from '@nestjs/common';
import { pineconeService } from './pinecone.service';
import { ConfigModule } from '@nestjs/config';
 
 

@Module({
    imports:[ConfigModule.forRoot()],
    providers: [pineconeService],
    exports:[pineconeService]
})
export class pineconeModule {};