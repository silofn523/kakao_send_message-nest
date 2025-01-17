/* eslint-disable prettier/prettier */
import { Injectable, NotAcceptableException } from '@nestjs/common'
import { SendMessageDto } from './dto/send-message.dto'

@Injectable()
export class MessageService {
  public async sendMessageToMe(token: string, dto: SendMessageDto) {
    const { objType, text, webUrl, mobileUrl, btnTitle } = dto

    const response = await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        template_object: JSON.stringify({
          object_type: objType,
          text: text,
          link: {
            web_url: webUrl,
            mobile_web_url: mobileUrl
          },
          button_title: btnTitle
        })
      })
    })

    const result = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: '메시지 전송 성공',
        data: result
      }
    } else {
      throw new NotAcceptableException({
        success: false,
        message: `메시지 전송 에러 : ${result.msg}`
      })
    }
  }
}
