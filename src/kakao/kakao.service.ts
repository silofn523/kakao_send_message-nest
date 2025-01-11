/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException
} from '@nestjs/common'
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

  public async verifyKakaoToken(token: string) {
    try {
      const response = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const tokenInfo = await response.json()

      if (tokenInfo.code) {
        throw new InternalServerErrorException({
          success: false,
          message: 'Kakao Token Validation Failed: ' + tokenInfo.msg
        })
      }

      return tokenInfo
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Kakao Token Validation Failed: ' + error
      })
    }
  }

  public async refreshKakaoAccessToken(refreshToken: string): Promise<any> {
    const params: { [key: string]: string } = {
      grant_type: 'refresh_token',
      client_id: this.configService.get<string>('KAKAO_RESTAPI_KEY'),
      refresh_token: refreshToken
    }

    const clientSecret = this.configService.get<string>('KAKAO_CLIENT_PW')

    if (clientSecret) {
      params.client_secret = clientSecret
    }

    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(params)
    })

    const data = await response.json()

    if (data.error) {
      throw new NotAcceptableException({
        success: false,
        message: `카카오 토큰 재발급에 실패했습니다: ${data.error_description}`
      })
    }

    return data
  }
}
