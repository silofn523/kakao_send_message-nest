/* eslint-disable prettier/prettier */
import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common'
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
}
