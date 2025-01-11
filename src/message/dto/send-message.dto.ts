/* eslint-disable prettier/prettier */
import { IsString } from "class-validator"

export class SendMessageDto {
   @IsString()
   public readonly objType: string

   @IsString()
   public readonly text: string

   @IsString()
   public readonly webUrl: string

   @IsString()
   public readonly mobileUrl: string

   @IsString()
   public readonly btnTitle: string
}