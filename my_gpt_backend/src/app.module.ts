import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { doc_query_controller } from './doc_query/doc_query.controller';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController,doc_query_controller],
  providers: [AppService, AuthService],
})
export class AppModule {}
