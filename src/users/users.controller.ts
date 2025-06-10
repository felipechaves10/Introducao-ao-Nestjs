import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('/users')
export class UsersController {

    private usersService: UsersService

    constructor(userService: UsersService){
        this.usersService = userService
    }

    
    // Rota de criar usuário
    @Post()
    create(@Body() data: any) {
        return this.usersService.create(data)
    }

    
}