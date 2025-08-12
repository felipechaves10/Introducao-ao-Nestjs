import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { loginndto } from './dto/login.dto';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiBody({ type: RegisterDto })
    @ApiCreatedResponse({ description: 'Usuário registrado com sucesso' })
    @ApiConflictResponse({ description: 'Email já em uso' })

    async regiterUser (@Body()userData: RegisterDto) {
        return this.authService.registerUser(userData);

}

 @Post('login')
    @ApiBody({ type: loginndto })
    async login(@Body() dto: loginndto): Promise<LoginResponseDto> {
        return this.authService.login(dto);
}


    
}

