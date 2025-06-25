    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

    async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configurações da documentação Swagger
    const config = new DocumentBuilder()
        .setTitle('API de Usuários')
        .setDescription('Documentação da API de usuários com NestJS + Prisma + Swagger')
        .setVersion('1.0')
        .addTag('users') // Tag opcional para categorizar as rotas
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // Acessível em http://localhost:3000/api


app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true, // remova propriedades não decorada no DTO
        forbidNonWhitelisted: true, // rotorn ero se enviar propriedade

    })
)

    await app.listen(3001);
    }
import { ValidationPipe } from '@nestjs/common';
bootstrap();