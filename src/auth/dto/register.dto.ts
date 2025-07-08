import { IsEmail, isPort, IsString, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";


  export class RegisterDto{

    @ApiProperty({
        example: 'felipe carneiro',
        description: 'nome do usuario'
    })
    
@IsString()
    name: string

     @ApiProperty({
        example: 'felipe@gmail.com',
        description: 'email do usuario'
    })
@IsEmail()
    email: string

     @ApiProperty({
        example: 'felipe123',
        description: 'senha do usuario'
    })
    @IsString()
    @MinLength(6)
    password: string
}






