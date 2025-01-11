/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { KakaoService } from './kakao.service'
import { KakaoController } from './kakao.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { KakaoStrategy } from './kakao.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'kakao' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET', 'JWT')
      })
    })
  ],
  controllers: [KakaoController],
  providers: [KakaoService, KakaoStrategy],
  exports: [KakaoService]
})
export class KakaoModule {}
