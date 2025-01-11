/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MessageModule } from './message/message.module'
import { KakaoModule } from './kakao/kakao.module'
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [MessageModule, KakaoModule, ConfigurationModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
