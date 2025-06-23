import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({
        example: 'Amaral Neto',
        description: 'Nome completo do usuário!'
    })
    @IsNotEmpty({ message: 'Campo obrigatório!' })
    @IsString()
    name: string

    @ApiProperty({
        example: 'amaral@gmail.com',
        description: 'Email do usuário!'
    })
    @IsEmail({}, { message: 'Email inválido!' })
    email: string
}