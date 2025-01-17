/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-kakao'

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('KAKAO_RESTAPI_KEY'),
      callbackURL: configService.get<string>('KAKAO_REDIRECT_URI'),
      scope: ['profile_nickname', 'profile_image', 'account_email']
    })
  }

  public async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const {
      id,
      displayName,
      provider,
      _json: { kakao_account }
    } = profile

    const email = kakao_account?.email || null
    const profileUrl = kakao_account?.profile?.profile_image_url || null

    const user = {
      id: id,
      provider: provider,
      profileUrl: profileUrl,
      name: displayName,
      email: email,
      accessToken
    }

    return user
  }
}
