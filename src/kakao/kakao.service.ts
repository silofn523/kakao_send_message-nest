/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'

@Injectable()
export class KakaoService {
  constructor(private readonly configService: ConfigService) {}

  public async kakaoLogin(req: Request) {
    const user = req.user

    if (!user) {
      return {
        success: false,
        message: 'No user from Kakao'
      }
    }

    return {
      message: 'User information from Kakao',
      user: user
    }
  }
}
