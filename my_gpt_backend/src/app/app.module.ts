import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { doc_query_controller } from '../doc_query/doc_query.controller';
import { doc_query_module } from '../doc_query/doc_query.module';
import { doc_query_service } from '../doc_query/doc_query.service';
import { openAiModule } from '../openAI/openAi.module';
import { openAiService } from '../openAI/openAi.service';
import { pineconeModule } from 'src/pinecone/pinecone.module';

@Module({
  imports: [AuthModule , doc_query_module,openAiModule,pineconeModule],
  controllers: [AppController, AuthController,doc_query_controller],
  providers: [AppService, AuthService,doc_query_service,openAiService],
})
export class AppModule {}
