/* eslint-disable prettier/prettier */
import { Controller, Get, UnauthorizedException, Req, UseGuards, Res } from '@nestjs/common'
import { KakaoService } from './kakao.service'
import { Request, Response } from 'express'
import { KakaoAuthGuard } from './kakao.guard'

@Controller('auth/kakao')
export class KakaoController {
  constructor(private readonly kakaoService: KakaoService) {}

  @Get('')
  @UseGuards(KakaoAuthGuard)
  public async kakaoLogin(@Res() res: Response) {}

  @Get('/callback')
  @UseGuards(KakaoAuthGuard)
  public async kakaoLoginCallback(@Req() req: Request) {
    return await this.kakaoService.kakaoLogin(req)
  }

  @Get('check_token')
  public async checkToken(@Req() req: Request) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException({
        success: false,
        message: 'Authorization header missing'
      })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      throw new UnauthorizedException({
        success: false,
        message: 'Token missing'
      })
    }
    const userInfo = await this.kakaoService.verifyKakaoToken(token)

    return {
      success: true,
      body: {
        userInfo
      }
    }
  }

  @Get('refresh')
  public async refreshGoogleToken(@Req() req: Request) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException({
        success: false,
        message: 'Authorization header missing'
      })
    }

    const refreshToken = authHeader.split(' ')[1]

    if (!refreshToken) {
      throw new UnauthorizedException({
        success: false,
        message: 'Refresh Token missing'
      })
    }
    const newTokenData = await this.kakaoService.refreshKakaoAccessToken(refreshToken)

    return {
      success: true,
      body: { newAccessToken: newTokenData.access_token }
    }
  }
}
