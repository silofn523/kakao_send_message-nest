/* eslint-disable prettier/prettier */
import { Controller, Get, UnauthorizedException, Req, Body, Post } from '@nestjs/common'
import { MessageService } from './message.service'
import { Request } from 'express'
import { SendMessageDto } from './dto/send-message.dto'

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send_message')
  public async sendMessageToMe(@Req() req: Request, @Body() dto: SendMessageDto) {
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

    const response = await this.messageService.sendMessageToMe(token, dto)

    return response
  }
}
