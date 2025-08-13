import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/createUser.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UpadateUserDto } from './dto/updateUser.dto'
import { JwtAuthGuard } from '../auth/jwt.grard'
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/users')
export class UsersController {

    private usersService: UsersService

    constructor(userService: UsersService){
        this.usersService = userService
    }

    
    // Rota de criar usuário
    // @Post()
    // @ApiOperation({ summary: 'Criar um novo usuário!' })
    // @ApiBody({ type: CreateUserDto })
    // @ApiResponse({ status: 201, description: 'Usuário criado com sucesso!' })
    // create(@Body() data: CreateUserDto) {
    //     return this.usersService.create(data)
    // }

    
    @Get()
    @ApiOperation({ summary: 'Vizualizar usuário!' })
    @ApiResponse({ status: 200 })
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Vizualizar usuário por ID!' })
    @ApiResponse({ status: 200 })
    findOne( @Param('id') id: string) {
        return  this.usersService.findOne(id)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar usuário!' })
    @ApiBody({ type: UpadateUserDto })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso!' })
    update( @Param('id')id: string, @Body() data:any) {
        return this.usersService.update(id, data)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar usuário!' })
    remove( @Param('id')id: string) {
        return this.usersService.remove(id)
    }
}