import { Module } from '@nestjs/common';
 
import { AuthModule } from '../auth/auth.module';
 
import { doc_query_module } from '../doc_query/doc_query.module';
 
import { openAiModule } from '../openAI/openAi.module';
 
import { PrismaModule } from 'src/prisma/prisma.module';
 
 

@Module({
  imports: [AuthModule ,doc_query_module,openAiModule,PrismaModule],
 
})
export class AppModule {}
